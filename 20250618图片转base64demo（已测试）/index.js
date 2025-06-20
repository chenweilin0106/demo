/**
 * 将图片转换为base64格式
 * @param {String|File|Blob} source - 图片源(本地路径、在线URL、File对象或Blob对象)
 * @returns {Promise<String>} - 返回base64字符串的Promise
 */
function imageToBase64(source) {
  return new Promise((resolve, reject) => {
    // 处理File或Blob对象
    if (source instanceof File || source instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(source);
      return;
    }

    // 处理URL字符串（本地路径或在线URL）
    if (typeof source === 'string') {
      // 创建图片元素
      const img = new Image();
      
      // 处理CORS问题
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        // 创建canvas并绘制图片
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // 获取base64数据
        try {
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } catch (error) {
          reject(new Error('无法将图片转换为base64，可能是由于CORS限制'));
        }
      };
      
      img.onerror = () => {
        reject(new Error('图片加载失败'));
      };
      
      // 设置图片源
      img.src = source;
      return;
    }
    
    // 不支持的输入类型
    reject(new Error('不支持的输入类型，请提供图片URL、File对象或Blob对象'));
  });
}

// 使用示例:

// 1. 在线图片URL
// imageToBase64('https://example.com/image.jpg')
//   .then(base64 => console.log(base64))
//   .catch(error => console.error(error));

// 2. 使用File对象（例如从input元素获取）
// const fileInput = document.querySelector('input[type="file"]');
// fileInput.addEventListener('change', (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     imageToBase64(file)
//       .then(base64 => console.log(base64))
//       .catch(error => console.error(error));
//   }
// });

// 3. 使用Blob对象
// fetch('https://example.com/image.jpg')
//   .then(response => response.blob())
//   .then(blob => imageToBase64(blob))
//   .then(base64 => console.log(base64))
//   .catch(error => console.error(error));
