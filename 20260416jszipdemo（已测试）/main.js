(function () {
  const dom = {
    generateSampleBtn: document.getElementById("generateSampleBtn"),
    parseSampleBtn: document.getElementById("parseSampleBtn"),
    downloadSampleBtn: document.getElementById("downloadSampleBtn"),
    zipInput: document.getElementById("zipInput"),
    sourceName: document.getElementById("sourceName"),
    statusText: document.getElementById("statusText"),
    entryCount: document.getElementById("entryCount"),
    folderCount: document.getElementById("folderCount"),
    firstJsonName: document.getElementById("firstJsonName"),
    entryList: document.getElementById("entryList"),
    trailList: document.getElementById("trailList"),
    folderOutput: document.getElementById("folderOutput"),
    stringOutput: document.getElementById("stringOutput"),
    jsonOutput: document.getElementById("jsonOutput"),
    base64Output: document.getElementById("base64Output"),
    base64Preview: document.getElementById("base64Preview"),
    blobOutput: document.getElementById("blobOutput"),
    blobImagePreview: document.getElementById("blobImagePreview"),
    blobVideoPreview: document.getElementById("blobVideoPreview"),
    arrayBufferOutput: document.getElementById("arrayBufferOutput"),
    uint8ArrayOutput: document.getElementById("uint8ArrayOutput"),
    logOutput: document.getElementById("logOutput"),
  };

  const state = {
    sampleBlob: null,
    sampleArrayBuffer: null,
    sampleDownloadUrl: "",
    previewObjectUrl: "",
  };

  function log(message) {
    const stamp = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    const current = dom.logOutput.textContent.trim();
    const nextText = current && current !== "等待操作..."
      ? `[${stamp}] ${message}\n${current}`
      : `[${stamp}] ${message}`;

    dom.logOutput.textContent = nextText;
  }

  function setStatus(text, sourceName) {
    dom.statusText.textContent = text;
    if (sourceName) {
      dom.sourceName.textContent = sourceName;
    }
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return map[char];
    });
  }

  function resetBlobPreview() {
    if (state.previewObjectUrl) {
      URL.revokeObjectURL(state.previewObjectUrl);
      state.previewObjectUrl = "";
    }

    dom.blobImagePreview.hidden = true;
    dom.blobImagePreview.removeAttribute("src");
    dom.blobVideoPreview.hidden = true;
    dom.blobVideoPreview.pause();
    dom.blobVideoPreview.removeAttribute("src");
    dom.blobVideoPreview.load();
  }

  function resetPreview() {
    dom.base64Preview.hidden = true;
    dom.base64Preview.removeAttribute("src");
    resetBlobPreview();
  }

  function resetResultBlocks() {
    dom.stringOutput.textContent = "暂无数据";
    dom.jsonOutput.textContent = "暂无数据";
    dom.base64Output.textContent = "暂无数据";
    dom.blobOutput.textContent = "暂无数据";
    dom.arrayBufferOutput.textContent = "暂无数据";
    dom.uint8ArrayOutput.textContent = "暂无数据";
    dom.folderOutput.textContent = "暂无数据";
    resetPreview();
  }

  function formatBytes(size) {
    if (!Number.isFinite(size) || size < 0) {
      return "未知";
    }

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  function toHexPreview(bytes) {
    const values = Array.from(bytes.slice(0, 16)).map((byte) =>
      byte.toString(16).padStart(2, "0")
    );
    return values.join(" ");
  }

  function getMimeType(fileName) {
    const ext = fileName.split(".").pop().toLowerCase();
    const mimeMap = {
      svg: "image/svg+xml",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      gif: "image/gif",
      webp: "image/webp",
      json: "application/json",
      txt: "text/plain",
      md: "text/markdown",
      mp4: "video/mp4",
      webm: "video/webm",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      bin: "application/octet-stream",
    };

    return mimeMap[ext] || "application/octet-stream";
  }

  function findFirstFile(zip, exactName, matcher) {
    const exact = exactName ? zip.file(exactName) : null;
    if (exact && !exact.dir) {
      return exact;
    }

    if (!matcher) {
      return null;
    }

    const matched = zip.file(matcher).find((item) => !item.dir);
    return matched || null;
  }

  function renderEntryList(entries) {
    if (!entries.length) {
      dom.entryList.innerHTML = '<p class="empty-hint">ZIP 内没有文件。</p>';
      return;
    }

    dom.entryList.innerHTML = entries
      .map(
        (item) => `
          <div class="entry-row">
            <span class="entry-name">${escapeHtml(item.name)}</span>
            <span class="entry-tag">${item.dir ? "目录" : "文件"}</span>
          </div>
        `
      )
      .join("");
  }

  function renderTrail(lines) {
    dom.trailList.innerHTML = lines
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join("");
  }

  function renderBlobPreview(blob, fileName) {
    resetBlobPreview();

    const previewUrl = URL.createObjectURL(blob);
    state.previewObjectUrl = previewUrl;
    const mimeType = blob.type || getMimeType(fileName);

    if (mimeType.startsWith("image/")) {
      dom.blobImagePreview.src = previewUrl;
      dom.blobImagePreview.hidden = false;
      return "图片 Blob 已通过 object URL 挂载到 <img>。";
    }

    if (mimeType.startsWith("video/")) {
      dom.blobVideoPreview.src = previewUrl;
      dom.blobVideoPreview.hidden = false;
      return "视频 Blob 已通过 object URL 挂载到 <video>。";
    }

    return "当前 Blob 不是图片或视频，页面不做可视化预览。";
  }

  function createDemoSvg() {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f8a8d" />
      <stop offset="100%" stop-color="#f26b4f" />
    </linearGradient>
  </defs>
  <rect width="320" height="180" rx="24" fill="#fff7ed" />
  <circle cx="70" cy="70" r="44" fill="url(#g)" opacity="0.8" />
  <circle cx="246" cy="118" r="54" fill="#15273c" opacity="0.12" />
  <path d="M70 118L150 50L222 118" fill="none" stroke="#15273c" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
  <text x="28" y="154" fill="#15273c" font-size="24" font-family="Arial, sans-serif">JSZip demo asset</text>
</svg>`.trim();
  }

  async function buildSampleZip() {
    const zip = new JSZip();
    const createdAt = new Date().toISOString();

    zip.file(
      "readme.txt",
      [
        "这是一个示例 ZIP。",
        "你可以在页面里看到 string / blob / base64 / arraybuffer / uint8array 的读取结果。",
        "生成时间：" + createdAt,
      ].join("\n")
    );

    zip.file(
      "data/info.json",
      JSON.stringify(
        {
          name: "JSZip 单页演示",
          author: "Codex",
          createdAt,
          features: [
            "loadAsync",
            "file",
            "folder",
            "generateAsync",
            "async(string/blob/base64/arraybuffer/uint8array)",
          ],
        },
        null,
        2
      )
    );

    zip.file("docs/changelog.md", "- v1: 初始示例\n- v2: 增加交互展示\n");
    zip.file("images/demo.svg", createDemoSvg());
    zip.file("binary/sample.bin", Uint8Array.from([8, 16, 32, 64, 128, 255, 13, 10]));

    const blob = await zip.generateAsync({ type: "blob" });
    const arrayBuffer = await blob.arrayBuffer();

    return { blob, arrayBuffer };
  }

  async function parseZip(arrayBuffer, sourceName) {
    setStatus("正在解析 ZIP ...", sourceName);
    resetResultBlocks();
    log(`开始解析：${sourceName}`);

    const zip = await JSZip.loadAsync(arrayBuffer);
    const entries = [];
    zip.forEach((relativePath, file) => {
      entries.push({ name: relativePath, dir: file.dir });
    });

    renderEntryList(entries);
    dom.entryCount.textContent = entries.filter((item) => !item.dir).length;
    dom.folderCount.textContent = entries.filter((item) => item.dir).length;

    const jsonFiles = zip.file(/\.json$/i).filter((item) => !item.dir);
    dom.firstJsonName.textContent = jsonFiles[0] ? jsonFiles[0].name : "未找到";

    const textFile = findFirstFile(zip, "readme.txt", /\.(txt|md)$/i);
    const jsonFile = findFirstFile(zip, "data/info.json", /\.json$/i);
    const imageFile = findFirstFile(zip, "images/demo.svg", /\.(svg|png|jpe?g|gif|webp)$/i);
    const binaryFile = findFirstFile(zip, "binary/sample.bin", /\.(bin|dat)$/i);

    renderTrail([
      `JSZip.loadAsync(arrayBuffer) -> 得到 zip 对象，共 ${entries.length} 个条目`,
      textFile
        ? `zip.file('${textFile.name}') -> 找到文本文件`
        : "zip.file('readme.txt') -> 没找到，已尝试回退到首个文本文件",
      jsonFile
        ? `zip.file('${jsonFile.name}') -> 找到 JSON 文件`
        : "zip.file('data/info.json') -> 没找到，已尝试回退到首个 JSON 文件",
      imageFile
        ? `zip.file('${imageFile.name}') -> 找到图片文件`
        : "zip.file('images/demo.svg') -> 没找到，已尝试回退到首个图片文件",
      binaryFile
        ? `zip.file('${binaryFile.name}') -> 找到二进制文件`
        : "zip.file('binary/sample.bin') -> 没找到，二进制示例不可用",
    ]);

    if (textFile) {
      const stringValue = await textFile.async("string");
      dom.stringOutput.textContent = `文件：${textFile.name}\n\n${stringValue}`;
      log(`已读取文本文件：${textFile.name}`);
    } else {
      dom.stringOutput.textContent = "ZIP 中没有找到文本文件。";
    }

    if (jsonFile) {
      const jsonText = await jsonFile.async("string");
      const jsonValue = JSON.parse(jsonText);
      dom.jsonOutput.textContent = JSON.stringify(jsonValue, null, 2);
      log(`已读取 JSON 文件：${jsonFile.name}`);
    } else {
      dom.jsonOutput.textContent = "ZIP 中没有找到 JSON 文件。";
    }

    if (imageFile) {
      const mimeType = getMimeType(imageFile.name);
      const base64Value = await imageFile.async("base64");
      dom.base64Output.textContent = `文件：${imageFile.name}\n类型：${mimeType}\n长度：${base64Value.length} 个字符\n前 96 位：\n${base64Value.slice(0, 96)}...`;
      dom.base64Preview.src = `data:${mimeType};base64,${base64Value}`;
      dom.base64Preview.hidden = false;

      const imageBlob = await imageFile.async("blob");
      const typedImageBlob =
        imageBlob.type === mimeType
          ? imageBlob
          : imageBlob.slice(0, imageBlob.size, mimeType);
      const blobNote = renderBlobPreview(
        typedImageBlob,
        imageFile.name
      );
      dom.blobOutput.textContent = `文件：${imageFile.name}\n大小：${formatBytes(imageBlob.size)}\n类型：${typedImageBlob.type || mimeType}\n${blobNote}`;

      const imageArrayBuffer = await imageFile.async("arraybuffer");
      dom.arrayBufferOutput.textContent = `文件：${imageFile.name}\nbyteLength：${imageArrayBuffer.byteLength}\n说明：同样的数据可以继续交给其他解析库。`;
      log(`已读取图片文件：${imageFile.name}`);
    } else {
      dom.base64Output.textContent = "ZIP 中没有找到图片文件。";
      dom.blobOutput.textContent = "ZIP 中没有找到图片文件。";
      dom.arrayBufferOutput.textContent = "ZIP 中没有找到图片文件。";
    }

    if (binaryFile) {
      const uint8Value = await binaryFile.async("uint8array");
      dom.uint8ArrayOutput.textContent = `文件：${binaryFile.name}\n长度：${uint8Value.length}\n前 16 个字节（十六进制）：\n${toHexPreview(uint8Value)}`;
      log(`已读取二进制文件：${binaryFile.name}`);
    } else {
      dom.uint8ArrayOutput.textContent = "ZIP 中没有找到二进制示例文件。";
    }

    const folderEntries = entries
      .filter((item) => !item.dir && item.name.startsWith("images/"))
      .map((item) => item.name);
    dom.folderOutput.textContent = folderEntries.length
      ? folderEntries.join("\n")
      : "ZIP 中没有 images 目录。";

    setStatus("解析完成", sourceName);
    log(`解析完成：${sourceName}`);
  }

  async function ensureSampleZip() {
    if (state.sampleBlob && state.sampleArrayBuffer) {
      return;
    }

    setStatus("正在生成示例 ZIP ...");
    log("开始生成示例 ZIP。");
    const sample = await buildSampleZip();
    state.sampleBlob = sample.blob;
    state.sampleArrayBuffer = sample.arrayBuffer;
    dom.parseSampleBtn.disabled = false;
    dom.downloadSampleBtn.disabled = false;

    if (state.sampleDownloadUrl) {
      URL.revokeObjectURL(state.sampleDownloadUrl);
    }

    state.sampleDownloadUrl = URL.createObjectURL(state.sampleBlob);
    setStatus("示例 ZIP 已准备好", "内存中的示例 ZIP");
    log("示例 ZIP 已生成。");
  }

  dom.generateSampleBtn.addEventListener("click", async () => {
    try {
      await ensureSampleZip();
    } catch (error) {
      console.error(error);
      setStatus("生成失败");
      log(`生成失败：${error.message}`);
    }
  });

  dom.parseSampleBtn.addEventListener("click", async () => {
    try {
      await ensureSampleZip();
      await parseZip(state.sampleArrayBuffer.slice(0), "内存中的示例 ZIP");
    } catch (error) {
      console.error(error);
      setStatus("解析失败", "内存中的示例 ZIP");
      log(`解析失败：${error.message}`);
    }
  });

  dom.downloadSampleBtn.addEventListener("click", async () => {
    try {
      await ensureSampleZip();
      const link = document.createElement("a");
      link.href = state.sampleDownloadUrl;
      link.download = "jszip-demo-sample.zip";
      link.click();
      log("已触发示例 ZIP 下载。");
    } catch (error) {
      console.error(error);
      log(`下载失败：${error.message}`);
    }
  });

  dom.zipInput.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      await parseZip(arrayBuffer, `本地文件：${file.name}`);
    } catch (error) {
      console.error(error);
      setStatus("解析失败", `本地文件：${file.name}`);
      log(`本地 ZIP 解析失败：${error.message}`);
    } finally {
      event.target.value = "";
    }
  });

  window.addEventListener("beforeunload", () => {
    if (state.sampleDownloadUrl) {
      URL.revokeObjectURL(state.sampleDownloadUrl);
    }

    if (state.previewObjectUrl) {
      URL.revokeObjectURL(state.previewObjectUrl);
    }
  });

  ensureSampleZip()
    .then(() => parseZip(state.sampleArrayBuffer.slice(0), "内存中的示例 ZIP"))
    .catch((error) => {
      console.error(error);
      setStatus("初始化失败");
      log(`初始化失败：${error.message}`);
    });
})();
