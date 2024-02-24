async function go() {
  const imports = {
	 wasi_snapshot_preview1: {
		args_get:
	 },
  };
  const results = await WebAssembly.instantiateStreaming(fetch("foo.wasm"), imports);
  console.log(results);
}

go();
