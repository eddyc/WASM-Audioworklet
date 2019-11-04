cmake_minimum_required(VERSION 2.8.9)
project(Sine)

set(SOURCES src/Sine.c src/Sine.h)
set(
  CMAKE_C_FLAGS
  "${CMAKE_C_FLAGS} --pre-js ${CMAKE_SOURCE_DIR}/src/prejs.js -s \"BINARYEN_METHOD='native-wasm'\"  -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s ENVIRONMENT=web,worker -s MODULARIZE=1 -s SINGLE_FILE=1 -s BINARYEN_ASYNC_COMPILATION=0 -s ASSERTIONS=0 -s EXPORT_NAME=\"'libSine'\""
  )

add_executable(Sine ${SOURCES})

add_custom_command(TARGET Sine POST_BUILD
                   COMMAND cat
                           ${CMAKE_SOURCE_DIR}/src/postjs.js
                           >>
                           ${CMAKE_BUILD_RPATH}Sine.js)

add_custom_command(TARGET Sine POST_BUILD
                   COMMAND ${CMAKE_COMMAND}
                           -E
                           copy
                           ${CMAKE_BUILD_RPATH}Sine.js
                           ${CMAKE_SOURCE_DIR}/../web/src/wasm/Sine.js)
