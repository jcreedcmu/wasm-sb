# To build mlton:
# pulled down branch https://github.com/agoode/mlton/tree/wasm2
# ran build-mlton.sh

MLTON=/home/jcreed/pgit/mlton-wasm2-INSTALL/bin/mlton

watch:
	node build.js watch

foo.wasm:
	$(MLTON) -target wasm32-unknown-wasi -format libexecutable -output foo.wasm foo.sml

serve:
	python3 -m http.server
