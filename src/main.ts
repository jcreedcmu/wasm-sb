import { WasiSnapshotPreview1, args_get, args_sizes_get, clock_time_get, environ_sizes_get, fd_write } from "./wasi";

async function go() {
  const output: string[] = [];
  const argv: string[] = ['foo'];

  let mem: WebAssembly.Memory | undefined;

  const imports: { wasi_snapshot_preview1: WebAssembly.ModuleImports & WasiSnapshotPreview1 } = {
    wasi_snapshot_preview1: {
      args_get: (...args) => args_get(mem!, argv, ...args),
      args_sizes_get: (...args) => args_sizes_get(mem!, argv, ...args),
      clock_time_get: (...args) => clock_time_get(mem!, ...args),
      environ_sizes_get: (...args) => environ_sizes_get(mem!, ...args),
      environ_get: () => { console.log('environ_get'); },
      proc_exit: () => { console.log('proc_exit'); },
      fd_close: () => { console.log('fd_close'); },
      fd_fdstat_get: () => { console.log('fd_fdstat_get'); },
      fd_fdstat_set_flags: () => { console.log('fd_fdstat_set_flags'); },
      fd_filestat_get: () => { console.log('fd_filestat_get'); },
      fd_pread: () => { console.log('fd_pread'); },
      fd_prestat_dir_name: () => { console.log('fd_prestat_dir_name'); },
      fd_prestat_get: () => { console.log('fd_prestat_get'); },
      fd_read: () => { console.log('fd_read'); },
      fd_seek: () => { console.log('fd_seek'); },
      fd_write: (...args) => { console.log('fd_write'); return fd_write(mem!, output, ...args); },

      // Paths
      path_filestat_get: () => { console.log('path_filestat_get'); },
      path_open: () => { console.log('path_open'); },
    }
  };

  const instance = await WebAssembly.instantiateStreaming(fetch("foo.wasm"), imports);
  const exports = instance.instance.exports as {
    memory: WebAssembly.Memory;
    foo_open(x: number, y: number): void;
    f3(): void;
  };
  console.log(exports);
  mem = exports.memory;
  exports.foo_open(0, 0);
  exports.f3();
  console.log(output);
}

go();
