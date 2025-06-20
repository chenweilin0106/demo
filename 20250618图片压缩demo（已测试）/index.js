/**
 * 通用图片压缩函数
 * @param {File|Blob|string} imageSource - 图片源(File, Blob, Base64字符串或URL)
 * @param {Object} options - 压缩选项
 * @param {number} [options.quality=0.7] - 压缩质量(0-1)
 * @param {number} [options.maxWidth] - 最大宽度，不传则保持原始宽度
 * @param {number} [options.maxHeight] - 最大高度，不传则保持原始高度
 * @param {'auto' | 'jpeg' | 'jpg' | 'png' | 'webp'} [options.format='auto'] - 输出格式 auto-会判断图片是否包含透明通道，如果包含则输出png，否则输出jpeg
 * @param {'blob' | 'base64' | 'file'} [options.outputType='base64'] - 输出类型('blob', 'base64', 'file')
 * @param {string} [options.fileName] - 如果输出类型为file，指定文件名
 * @returns {Promise<Blob|string|File>} 压缩后的图片
 * 
 * @example
 * // 基本用法 - 压缩上传的图片文件
 * const fileInput = document.getElementById('fileInput');
 * fileInput.addEventListener('change', async (e) => {
 *   const file = e.target.files[0];
 *   // 默认压缩为70%质量的base64
 *   const compressedBase64 = await compressImage(file);
 *   document.getElementById('preview').src = compressedBase64;
 * });
 * 
 * @example
 * const compressedBlob = await compressImage(imageFile, {
 *   quality: 0.5,
 *   format: 'webp',
 *   outputType: 'blob'
 * })
 */
function compressImage(imageSource, options = {}) {
  // 默认选项
  const settings = {
    quality: options.quality || 0.7,
    maxWidth: options.maxWidth, // 不设默认值，保持原始宽度
    maxHeight: options.maxHeight, // 不设默认值，保持原始高度
    format: options.format || 'auto',
    outputType: options.outputType || 'base64', // 默认返回base64
    fileName: options.fileName || 'compressed-image'
  }

  /**
   * 将不同类型的图片源标准化为URL或DataURL
   * @param {File|Blob|string} source 
   * @returns {Promise<string>}
   */
  async function normalizeImageSource(source) {
    // 如果是字符串，可能是URL或Base64
    if (typeof source === 'string') {
      // 检查是否是Base64
      if (source.startsWith('data:image')) {
        return source
      }
      // 假设是URL，直接返回
      return source
    }
    
    // 如果是File或Blob
    if (source instanceof File || source instanceof Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(source)
      })
    }
    
    throw new Error('不支持的图片源类型')
  }

  /**
   * 检测图片是否包含透明通道
   * @param {HTMLImageElement} img 
   * @returns {boolean}
   */
  function detectTransparency(img) {
    // 创建一个小画布来检测透明度
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // 使用较小的尺寸进行检测以提高性能
    const size = Math.min(50, img.width, img.height)
    canvas.width = size
    canvas.height = size
    
    // 绘制图像
    ctx.drawImage(img, 0, 0, size, size)
    
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, size, size).data
    
    // 检查是否有透明像素
    for (let i = 3; i < imageData.length; i += 4) {
      if (imageData[i] < 255) {
        return true // 找到透明像素
      }
    }
    
    return false // 没有透明像素
  }

  /**
   * 计算保持纵横比的新尺寸
   * @param {number} width 原始宽度
   * @param {number} height 原始高度
   * @param {number} maxWidth 最大宽度
   * @param {number} maxHeight 最大高度
   * @returns {{width: number, height: number}}
   */
  function calculateDimensions(width, height, maxWidth, maxHeight) {
    // 如果图片尺寸已经小于最大限制，则保持原始尺寸
    if (width <= maxWidth && height <= maxHeight) {
      return { width, height }
    }
    
    // 计算宽高比
    const aspectRatio = width / height
    
    // 根据宽高比决定如何调整尺寸
    if (width / maxWidth > height / maxHeight) {
      // 宽度是限制因素
      return {
        width: maxWidth,
        height: Math.round(maxWidth / aspectRatio)
      }
    } else {
      // 高度是限制因素
      return {
        width: Math.round(maxHeight * aspectRatio),
        height: maxHeight
      }
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      // 1. 将不同类型的输入转换为可用的图像源
      const imgSrc = await normalizeImageSource(imageSource)
      
      // 2. 创建Image对象
      const img = new Image()
      img.crossOrigin = 'anonymous' // 处理跨域图片
      
      img.onload = () => {
        // 3. 检测图片是否有透明通道
        const hasTransparency = settings.format === 'auto' ? 
          detectTransparency(img) : settings.format === 'png'
        
        // 4. 根据是否有透明通道选择输出格式
        let outputFormat = settings.format
        
        // 只有在自动模式下才进行格式选择
        if (settings.format === 'auto') {
          outputFormat = hasTransparency ? 'png' : 'jpeg'
        }
        
        // 5. 计算调整后的尺寸 - 如果没有提供maxWidth或maxHeight，使用原始尺寸
        const dimensions = calculateDimensions(img.width, img.height, 
          settings.maxWidth || img.width, settings.maxHeight || img.height)
        
        // 6. 创建canvas并绘制调整大小的图像
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        canvas.width = dimensions.width
        canvas.height = dimensions.height
        
        // 如果是jpeg或jpg，先填充白色背景（防止透明区域变黑）
        if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
        
        // 绘制图像
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        // 7. 根据输出格式和类型处理结果
        const mimeType = `image/${outputFormat}`
        
        // PNG不支持质量参数，所以只在非PNG格式时使用质量设置
        const qualityToUse = outputFormat === 'png' ? undefined : settings.quality
        
        if (settings.outputType === 'base64') {
          const base64 = canvas.toDataURL(mimeType, qualityToUse)
          resolve(base64)
        } else {
          canvas.toBlob(blob => {
            if (settings.outputType === 'file' && blob) {
              // 创建文件对象
              // 直接使用输出格式作为扩展名，不做转换
              const extension = outputFormat
              const file = new File([blob], `${settings.fileName}.${extension}`, {
                type: blob.type
              })
              resolve(file)
            } else {
              resolve(blob)
            }
          }, mimeType, qualityToUse)
        }
      }
      
      img.onerror = () => reject(new Error('图片加载失败'))
      img.src = imgSrc
      
    } catch (error) {
      reject(error)
    }
  })
}