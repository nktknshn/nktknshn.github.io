var CUSTOM_PARAMETERS = {
    archive_location_filter: function(e) {
      return "archive" + e;
    },
    engine_arguments: ["--verify-graphics-calls=false"],
    custom_heap_size: 33554432,
    full_screen_container: "#canvas-container",
    disable_context_menu: !0,
    retry_time: 1,
    retry_count: 10,
    unsupported_webgl_callback: function() {
      document.getElementById("webgl-not-supported").style.display = "block";
    },
    resize_window_callback: function() {
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.scrollTo(0, 0);
      var e,
        n,
        t,
        o = document.getElementById("app-container"),
        r = document.getElementById("canvas"),
        i = window.innerWidth,
        s = +window.innerHeight;
      -1 == i && -1 == s || (t = (e = 974) / (n = 900),
        i < e || s < n
          ? t < i / s
            ? (o.style.marginLeft = (i - (e = (n = s) * t)) / 2 + "px", o.style.marginTop = "0px")
            : (n = (e = i) / t, o.style.marginLeft = "0px", o.style.marginTop = (s - n) / 2 + "px")
          : (o.style.marginLeft = (i - e) / 2 + "px", o.style.marginTop = (s - n) / 2 + "px"),
        t = 1,
        t = window.devicePixelRatio || 1,
        o.style.width = e + "px",
        o.style.height = n + 0 + "px",
        r.width = Math.floor(e * t),
        r.height = Math.floor(n * t));
    },
  },
  FileLoader = {
    options: { retryCount: 4, retryInterval: 1e3 },
    request: function(e, s, a, d) {
      if (void 0 === s) throw TypeError("No method specified");
      if ("responseType" == typeof s) throw TypeError("No responseType specified");
      void 0 === d && (d = 0);
      var l = {
        send: function() {
          var n = this.onprogress, t = this.onload, o = this.onerror, r = this.onretry, i = new ArchiveJsRequest();
          i._loadedSize = 0,
            i.open(s, e, !0),
            i.responseType = a,
            i.onprogress = function(e) {
              n && n(i, e, i._loadedSize), i._loadedSize = e.loaded;
            },
            i.onerror = function(e) {
              d == FileLoader.options.retryCount
                ? o && o(i, e)
                : (r && r(i, e, i._loadedSize, d),
                  i._loadedSize = 0,
                  d += 1,
                  setTimeout(l.send.bind(l), FileLoader.options.retryInterval));
            },
            i.onload = function(e) {
              t && t(i, e);
            },
            i.send(null);
        },
      };
      return l;
    },
    size: function(e, t) {
      e = FileLoader.request(e, "HEAD", "text");
      e.onerror = function(e, n) {
        t(void 0);
      },
        e.onload = function(e, n) {
          4 === e.readyState && (200 === e.status ? (e = e.getResponseHeader("content-length"), t(e)) : t(void 0));
        },
        e.send();
    },
    load: function(t, o, r, i, s, a) {
      var e = FileLoader.request(t, "GET", o);
      e.onprogress = function(e, n, t) {
        n = n.loaded - t;
        r(n);
      },
        e.onerror = function(e, n) {
          i("Error loading '" + t + "' (" + n + ")");
        },
        e.onload = function(e, n) {
          e.readyState === ArchiveJsRequest.DONE
            && (200 === e.status
              ? (e = e.response, s("json" == o && "string" == typeof e ? JSON.parse(e) : e))
              : i("Error loading '" + t + "' (" + n + ")"));
        },
        e.onretry = function(e, n, t, o) {
          a(t, o);
        },
        e.send();
    },
  },
  EngineLoader = {
    wasm_size: 1767603,
    wasmjs_size: 339622,
    asmjs_size: 4e6,
    wasm_instantiate_progress: 0,
    stream_wasm: !1,
    updateWasmInstantiateProgress: function(e) {
      EngineLoader.wasm_instantiate_progress = .1 * e;
    },
    loadAndInstantiateWasmAsync: function(e, n, t) {
      FileLoader.load(e, "arraybuffer", function(e) {
        ProgressUpdater.updateCurrent(e);
      }, function(e) {
        throw e;
      }, function(e) {
        if (e.byteLength != EngineLoader.wasm_size) {
          throw "Invalid wasm size. Expected: " + EngineLoader.wasm_size + ", actual: " + e.byteLength;
        }
        WebAssembly.instantiate(new Uint8Array(e), n).then(function(e) {
          t(e.instance);
        }).catch(function(e) {
          throw console.log("wasm instantiation failed! " + e), e;
        });
      }, function(e, n) {
        ProgressUpdater.updateCurrent(-e);
      });
    },
    streamAndInstantiateWasmAsync: async function(n, t, o) {
      var e = fetch;
      "function" == typeof TransformStream && ReadableStream.prototype.pipeThrough && (e = async function(e) {
        var n;
        return (e = await fetch(e)).ok
          ? (n = new TransformStream({
            transform(e, n) {
              ProgressUpdater.updateCurrent(e.byteLength), n.enqueue(e);
            },
          }),
            new Response(e.body.pipeThrough(n), e))
          : new Response(null, e);
      }),
        WebAssembly.instantiateStreaming(e(n), t).then(function(e) {
          ProgressUpdater.updateCurrent(EngineLoader.wasm_instantiate_progress), o(e.instance);
        }).catch(function(e) {
          console.log("wasm streaming instantiation failed! " + e),
            console.log("Fallback to wasm loading"),
            EngineLoader.loadAndInstantiateWasmAsync(n, t, o);
        });
    },
    loadWasmAsync: function(t) {
      Module.instantiateWasm = function(e, n) {
        return EngineLoader.stream_wasm && "function" == typeof WebAssembly.instantiateStreaming
          ? EngineLoader.streamAndInstantiateWasmAsync(t + ".wasm", e, n)
          : EngineLoader.loadAndInstantiateWasmAsync(t + ".wasm", e, n),
          {};
      }, EngineLoader.loadAndRunScriptAsync(t + "_wasm.js");
    },
    loadAsmJsAsync: function(e) {
      EngineLoader.loadAndRunScriptAsync(e + "_asmjs.js");
    },
    loadAndRunScriptAsync: function(e) {
      FileLoader.load(e, "text", function(e) {
        ProgressUpdater.updateCurrent(e);
      }, function(e) {
        throw e;
      }, function(e) {
        var n = document.createElement("script");
        n.text = e, document.body.appendChild(n);
      }, function(e, n) {
        ProgressUpdater.updateCurrent(-e);
      });
    },
    load: function(e, n) {
      ProgressView.addProgress(Module.setupCanvas(e)),
        CUSTOM_PARAMETERS.exe_name = n,
        FileLoader.options.retryCount = CUSTOM_PARAMETERS.retry_count,
        FileLoader.options.retryInterval = 1e3 * CUSTOM_PARAMETERS.retry_time,
        "function" == typeof CUSTOM_PARAMETERS.can_not_download_file_callback
        && GameArchiveLoader.addFileDownloadErrorListener(CUSTOM_PARAMETERS.can_not_download_file_callback),
        GameArchiveLoader.addFileLoadedListener(Module.onArchiveFileLoaded),
        GameArchiveLoader.addArchiveLoadedListener(Module.onArchiveLoaded),
        GameArchiveLoader.setFileLocationFilter(CUSTOM_PARAMETERS.archive_location_filter),
        GameArchiveLoader.loadArchiveDescription("/archive_files.json"),
        "function" == typeof CUSTOM_PARAMETERS.resize_window_callback
        && ((e = CUSTOM_PARAMETERS.resize_window_callback)(),
          window.addEventListener("resize", e, !1),
          window.addEventListener("orientationchange", e, !1),
          window.addEventListener("focus", e, !1));
    },
  },
  GameArchiveLoader = {
    _files: [],
    _fileIndex: 0,
    isCompleted: !1,
    _onFileLoadedListeners: [],
    _onArchiveLoadedListeners: [],
    _onFileDownloadErrorListeners: [],
    _archiveLocationFilter: function(e) {
      return "split" + e;
    },
    cleanUp: function() {
      this._files = [],
        this._fileIndex = 0,
        this.isCompleted = !1,
        this._onGameArchiveLoaderCompletedListeners = [],
        this._onAllTargetsBuiltListeners = [],
        this._onFileDownloadErrorListeners = [];
    },
    addListener: function(e, n) {
      if ("function" != typeof n) throw TypeError("Invalid callback registration");
      e.push(n);
    },
    notifyListeners: function(e, n) {
      for (i = 0; i < e.length; ++i) e[i](n);
    },
    addFileDownloadErrorListener: function(e) {
      this.addListener(this._onFileDownloadErrorListeners, e);
    },
    notifyFileDownloadError: function(e) {
      this.notifyListeners(this._onFileDownloadErrorListeners, e);
    },
    addFileLoadedListener: function(e) {
      this.addListener(this._onFileLoadedListeners, e);
    },
    notifyFileLoaded: function(e) {
      this.notifyListeners(this._onFileLoadedListeners, { name: e.name, data: e.data });
    },
    addArchiveLoadedListener: function(e) {
      this.addListener(this._onArchiveLoadedListeners, e);
    },
    notifyArchiveLoaded: function() {
      this.notifyListeners(this._onArchiveLoadedListeners);
    },
    setFileLocationFilter: function(e) {
      if ("function" != typeof e) throw "Invalid filter";
      this._archiveLocationFilter = e;
    },
    loadArchiveDescription: function(n) {
      FileLoader.load(this._archiveLocationFilter(n), "json", function(e) {}, function(e) {
        GameArchiveLoader.notifyFileDownloadError(n);
      }, function(e) {
        GameArchiveLoader.onReceiveDescription(e);
      }, function(e, n) {});
    },
    onReceiveDescription: function(e) {
      var n = e.total_size, t = CUSTOM_PARAMETERS.exe_name, e = (this._files = e.content, Module.isWASMSupported);
      e
        ? (EngineLoader.loadWasmAsync(t), n += EngineLoader.wasm_size + EngineLoader.wasmjs_size)
        : (EngineLoader.loadAsmJsAsync(t), n += EngineLoader.asmjs_size),
        this.downloadContent(),
        ProgressUpdater.resetCurrent(),
        e && EngineLoader.updateWasmInstantiateProgress(n),
        ProgressUpdater.setupTotal(n + EngineLoader.wasm_instantiate_progress);
    },
    downloadContent: function() {
      var e = this._files[this._fileIndex],
        n = (1 < e.pieces.length && (e.data = new Uint8Array(e.size)), e.pieces.length);
      void 0 !== this.MAX_CONCURRENT_XHR && (n = Math.min(n, this.MAX_CONCURRENT_XHR));
      for (var t = 0; t < n; ++t) this.downloadPiece(e, t);
    },
    notifyDownloadProgress: function(e) {
      ProgressUpdater.updateCurrent(e);
    },
    downloadPiece: function(n, e) {
      if (e < n.lastRequestedPiece) {
        throw RangeError(
          "Request out of order: " + n.name + ", index: " + e + ", last requested piece: " + n.lastRequestedPiece,
        );
      }
      var t = n.pieces[e],
        e = (n.lastRequestedPiece = e, n.totalLoadedPieces = 0, this._archiveLocationFilter("/" + t.name));
      FileLoader.load(e, "arraybuffer", function(e) {
        GameArchiveLoader.notifyDownloadProgress(e);
      }, function(e) {
        GameArchiveLoader.notifyFileDownloadError(e);
      }, function(e) {
        t.data = new Uint8Array(e),
          t.dataLength = t.data.length,
          total = t.dataLength,
          downloaded = t.dataLength,
          GameArchiveLoader.onPieceLoaded(n, t),
          t.data = void 0;
      }, function(e, n) {
        ProgressUpdater.updateCurrent(-e);
      });
    },
    addPieceToFile: function(e, n) {
      if (1 == e.pieces.length) e.data = n.data;
      else {
        var t = n.offset, o = t + n.data.length;
        if (t < 0) throw RangeError("Buffer underflow. Start: " + t);
        if (o > e.data.length) throw RangeError("Buffer overflow. End : " + o + ", data length: " + e.data.length);
        e.data.set(n.data, n.offset);
      }
    },
    onPieceLoaded: function(e, n) {
      this.addPieceToFile(e, n),
        ++e.totalLoadedPieces,
        e.totalLoadedPieces == e.pieces.length
          ? this.onFileLoaded(e)
          : (n = e.lastRequestedPiece + 1) < e.pieces.length && this.downloadPiece(e, n);
    },
    verifyFile: function(e) {
      for (var n = 0, t = 0; t < e.pieces.length; ++t) n += e.pieces[t].dataLength;
      if (n != e.size) throw "Unexpected data size: " + e.name + ", expected size: " + e.size + ", actual size: " + n;
      if (1 < e.pieces.length) {
        for (var o = e.pieces, t = 0; t < o.length; ++t) {
          var r = o[t], i = r.offset, r = i + r.dataLength;
          if (0 < t) {
            var s = o[t - 1];
            if (s.offset + s.dataLength > i) {
              throw RangeError(
                "Segment underflow in file: " + e.name + ", offset: " + (s.offset + s.dataLength) + " , start: " + i,
              );
            }
          }
          if (o.length - 2 > t) {
            s = o[t + 1];
            if (r > s.offset) {
              throw RangeError("Segment overflow in file: " + e.name + ", offset: " + s.offset + ", end: " + r);
            }
          }
        }
      }
    },
    onFileLoaded: function(e) {
      this.verifyFile(e),
        this.notifyFileLoaded(e),
        ++this._fileIndex,
        this._fileIndex == this._files.length ? this.onArchiveLoaded() : this.downloadContent();
    },
    onArchiveLoaded: function() {
      this.isCompleted = !0, this.notifyArchiveLoaded();
    },
  },
  ProgressView = {
    progress_id: "defold-progress",
    bar_id: "defold-progress-bar",
    addProgress: function(e) {
      e.insertAdjacentHTML(
        "afterend",
        "<div id=\"" + ProgressView.progress_id + "\" class=\"canvas-app-progress\"><div id=\"" + ProgressView.bar_id
          + "\" class=\"canvas-app-progress-bar\" style=\"transform: scaleX(0.0);\"></div></div>",
      ),
        ProgressView.bar = document.getElementById(ProgressView.bar_id),
        ProgressView.progress = document.getElementById(ProgressView.progress_id);
    },
    updateProgress: function(e) {
      ProgressView.bar && (ProgressView.bar.style.transform = "scaleX(" + Math.min(e, 100) / 100 + ")");
    },
    removeProgress: function() {
      null !== ProgressView.progress.parentElement
        && (ProgressView.progress.parentElement.removeChild(ProgressView.progress),
          Module.canvas.style.background = "");
    },
  },
  ProgressUpdater = {
    current: 0,
    total: 1,
    listeners: [],
    addListener: function(e) {
      if ("function" != typeof e) throw TypeError("Invalid callback registration");
      this.listeners.push(e);
    },
    notifyListeners: function(e) {
      for (i = 0; i < this.listeners.length; ++i) this.listeners[i](e);
    },
    setupTotal: function(e) {
      this.total = e;
    },
    setCurrent: function(e) {
      this.current = e;
      e = this.calculateProgress();
      ProgressView.updateProgress(e), this.notifyListeners(e);
    },
    updateCurrent: function(e) {
      this.current += e;
      e = this.calculateProgress();
      ProgressView.updateProgress(e), this.notifyListeners(e);
    },
    resetCurrent: function() {
      this.current = 0;
    },
    complete: function() {
      this.setCurrent(this.total);
    },
    calculateProgress: function() {
      return this.current / this.total * 100;
    },
  },
  Progress = {
    addListener: function(e) {
      ProgressUpdater.addListener(e);
    },
    notifyListeners: function(e) {},
    addProgress: function(e) {
      ProgressView.addProgress(e);
    },
    updateProgress: function(e) {},
    calculateProgress: function(e, n, t, o) {},
    removeProgress: function() {
      ProgressView.removeProgress();
    },
  },
  Module = {
    noInitialRun: !0,
    _filesToPreload: [],
    _archiveLoaded: !1,
    _preLoadDone: !1,
    _isEngineLoaded: !1,
    persistentStorage: !0,
    _syncInProgress: !1,
    _syncNeeded: !1,
    _syncInitial: !1,
    _syncMaxTries: 3,
    _syncTries: 0,
    arguments: [],
    print: function(e) {
      console.log(e);
    },
    printErr: function(e) {
      console.error(e);
    },
    setStatus: function(e) {
      console.log(e);
    },
    isWASMSupported: function() {
      try {
        if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
          var e = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
          if (e instanceof WebAssembly.Module) return new WebAssembly.Instance(e) instanceof WebAssembly.Instance;
        }
      } catch (e) {}
      return !1;
    }(),
    prepareErrorObject: function(e, n, t, o, r) {
      n = (n = void 0 === n ? "" : n) + ":" + (t = void 0 === t ? 0 : t) + ":" + (o = void 0 === o ? 0 : o),
        t = r || (void 0 !== window.event ? window.event.error : "") || e || "Undefined Error",
        o = "",
        r = "",
        "object" == typeof t && void 0 !== t.stack && void 0 !== t.message
          ? (r = String(t.stack), o = String(t.message))
          : (o = (r = String(t).split("\n")).shift(), r = r.join("\n")),
        r = r || n,
        e = /at (\S+:\d*$)/.exec(o);
      return e && (o = o.replace(/(at \S+:\d*$)/, ""), r = e[1] + "\n" + r),
        o = o.replace(/(abort\(.+\)) at .+/, "$1"),
        {
          stack: r =
            (r = (r = (r = (r = r.replace(/\?{1}\S+(:\d+:\d+)/g, "$1")).replace(/ *at (\S+)$/gm, "@$1")).replace(
              / *at (\S+)(?: \[as \S+\])? +\((.+)\)/g,
              "$1@$2",
            )).replace(/^((?:Object|Array)\.)/gm, "")).split("\n"),
          message: o,
        };
    },
    hasWebGLSupport: function() {
      var n = !1;
      try {
        var e = document.createElement("canvas"), t = e.getContext("webgl") || e.getContext("experimental-webgl");
        t && t instanceof WebGLRenderingContext && (n = !0);
      } catch (e) {
        console.log("An error occurred while detecting WebGL support: " + e), n = !1;
      }
      return n;
    },
    setupCanvas: function(e) {
      return e = void 0 === e ? "canvas" : e, Module.canvas = document.getElementById(e), Module.canvas;
    },
    runApp: function(e, n) {
      Module._isEngineLoaded = !0, Module.setupCanvas(e), Module.arguments = CUSTOM_PARAMETERS.engine_arguments;
      e = CUSTOM_PARAMETERS.full_screen_container;
      "string" == typeof e && (e = document.querySelector(e)),
        Module.fullScreenContainer = e || Module.canvas,
        Module.hasWebGLSupport()
          ? (Module.canvas.focus(),
            CUSTOM_PARAMETERS.disable_context_menu && (Module.canvas.oncontextmenu = function(e) {
              e.preventDefault();
            }),
            Module._preloadAndCallMain())
          : (ProgressUpdater.complete(),
            Module.setStatus = function(e) {
              e && Module.printErr("[missing WebGL] " + e);
            },
            "function" == typeof CUSTOM_PARAMETERS.unsupported_webgl_callback
            && CUSTOM_PARAMETERS.unsupported_webgl_callback());
    },
    onArchiveFileLoaded: function(e) {
      Module._filesToPreload.push({ path: e.name, data: e.data });
    },
    onArchiveLoaded: function() {
      GameArchiveLoader.cleanUp(), Module._archiveLoaded = !0, Module._preloadAndCallMain();
    },
    toggleFullscreen: function(e) {
      GLFW.isFullscreen ? GLFW.cancelFullScreen() : GLFW.requestFullScreen(e);
    },
    preSync: function(n) {
      1 != Module.persistentStorage ? n() : FS.syncfs(!0, function(e) {
        e
          ? (Module._syncTries += 1,
            console.warn("Unable to synchronize mounted file systems: " + e),
            Module._syncMaxTries > Module._syncTries ? Module.preSync(n) : (Module._syncInitial = !0, n()))
          : (Module._syncInitial = !0, void 0 !== n && n());
      });
    },
    preloadAll: function() {
      if (!Module._preLoadDone) {
        Module._preLoadDone = !0;
        for (var e = 0; e < Module._filesToPreload.length; ++e) {
          var n = Module._filesToPreload[e];
          FS.createPreloadedFile("", n.path, n.data, !0, !0);
        }
      }
    },
    persistentSync: function() {
      1 == Module.persistentStorage && Module._syncInitial
        && (Module._syncInProgress ? Module._syncNeeded = !0 : Module._startSyncFS());
    },
    preInit: [function() {
      var e = DMSYS.GetUserPersistentDataRoot();
      try {
        FS.mkdir(e);
      } catch (e) {
        return Module.persistentStorage = !1, void Module._preloadAndCallMain();
      }
      try {
        FS.mount(IDBFS, {}, e);
        var n = FS.close;
        FS.close = function(e) {
          e = n(e);
          return Module.persistentSync(), e;
        };
      } catch (e) {
        return Module.persistentStorage = !1, void Module._preloadAndCallMain();
      }
      Module.preSync(function() {
        Module._preloadAndCallMain();
      });
    }],
    preRun: [function() {
      Module._archiveLoaded && Module.preloadAll();
    }],
    postRun: [function() {
      Module._archiveLoaded && ProgressView.removeProgress();
    }],
    _preloadAndCallMain: function() {
      (Module._syncInitial || 1 != Module.persistentStorage) && Module._archiveLoaded
        && (Module.preloadAll(), Module._isEngineLoaded && (ProgressUpdater.complete(), Module._callMain()));
    },
    _callMain: function() {
      ProgressView.removeProgress(),
        void 0 === Module.callMain ? Module.noInitialRun = !1 : Module.callMain(Module.arguments);
    },
    _startSyncFS: function() {
      Module._syncInProgress = !0,
        Module._syncMaxTries > Module._syncTries && FS.syncfs(!1, function(e) {
          Module._syncInProgress = !1,
            e && (console.warn("Unable to synchronize mounted file systems: " + e), Module._syncTries += 1),
            Module._syncNeeded && (Module._syncNeeded = !1, Module._startSyncFS());
        });
    },
  };
Module.persistentStorage = "undefined" != typeof window
  && !!(window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB),
  Module.INITIAL_MEMORY = CUSTOM_PARAMETERS.custom_heap_size,
  Module.onRuntimeInitialized = function() {
    Module.runApp("canvas");
  },
  Module.locateFile = function(e, n) {
    return n
      + (e = "dmengine.wasm" != e && "dmengine_release.wasm" != e && "dmengine_headless.wasm" != e
        ? e
        : "DefoldGames.wasm");
  },
  window.onerror = function(e, n, t, o, r) {
    void 0 !== Module.ccall
    && (e = Module.prepareErrorObject(e, n, t, o, r),
      Module.ccall("JSWriteDump", "null", ["string"], [JSON.stringify(e.stack)])),
      Module.setStatus("Exception thrown, see JavaScript console"),
      Module.setStatus = function(e) {
        e && Module.printErr("[post-exception status] " + e);
      };
  };
