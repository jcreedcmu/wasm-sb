#!/bin/bash

# https://github.com/MLton/mlton/pull/550

BUILD=/home/jcreed/pgit
MLTON=$BUILD/mlton-wasm2-INSTALL

# make wasm runtime

cd $BUILD/agoode-mlton
make clean
make CC=$WASISDK/bin/clang \
     AR=$WASISDK/bin/ar \
     RANLIB=$WASISDK/bin/ranlib \
     TARGET_OS=wasi \
     TARGET_ARCH=wasm32 \
     TARGET=wasm32-unknown-wasi \
     WITH_GMP_DIR=$BUILD/gmp-wasi-INSTALL \
     PREFIX=$MLTON \
     dirs runtime install-runtime

# make mlton binary

cd $BUILD/agoode-mlton
make clean
make all
make PREFIX=$MLTON install
