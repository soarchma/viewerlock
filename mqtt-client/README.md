https://offbyone.tistory.com/445

1. 프로젝트 폴더 생성
2. yarn classic으로 프로젝트 초기화(package.json 생성)
3. TypeScript 관련 모듈 설치
4. 타입스크립트 환경설정(tsconfig.json 생성)
5. 소스폴더와 출력폴더 만들기
6. 샘플소스 만들어서 빌드하고 실행해보기
7. yarn 에 build와 run 스크립트 추가하기
8. yarn berry로 마이그레이션
9. Visual Studio Code에서 개발환경 설정하기

10. 프로젝트 폴더 생성

- 프로젝트 폴더는 자신이 원하는 곳에 만들면 됩니다. 저는 vscode 프로젝트들을 D:\workspace\vscode 폴더 아래에 모아뒀습니다. 그러므로 작업용 프로젝트를 저장할 폴더를 D:\workspace\vscode\ts-test라고 만들었습니다.

D:\workspace\vscode>md ts-test

D:\workspace\vscode>cd ts-test

D:\workspace\vscode\ts-test

2. "yarn classic"으로 프로젝트 초기화(package.json 생성)

- "yarn berry"를 global로 설치하니 여러가지 오류가 많아서 yarn classic을 쓰고 필요하면 yarn berry로 마이그레이션하여 씁니다.
- "yarn init" 명령으로 프로젝트를 초기화합니다. 그러면 "package.json"파일이 생성됩니다.
- 질문중 "entry point"를 "src/app.ts"로 한것 외에는 모두 엔터키로 넘어가도 됩니다. 물론 이값도 다른것으로 바꿔도 되지만 뒤로도 계속 사용되므로 그대로 하는게 따라해보기 편할것입니다.

D:\workspace\vscode\ts-test>yarn init
yarn init v1.22.15
question name (ts-test):
question version (1.0.0):
question description: TypeScript Test
question entry point (index.js): src/app.ts
question repository url: http://pentode@localhost:5000/Bonobo.Git.Server/typescript-test.git
question author: pentode
question license (MIT):
question private:
success Saved package.json
Done in 306.11s.

- 생성된 "package.json" 파일의 내용은 다음과 같습니다.

D:\workspace\vscode\ts-test>type package.json
{
"name": "ts-test",
"version": "1.0.0",
"description": "TypeScript Test",
"main": "src/app.ts",
"repository": "http://pentode@localhost:5000/Bonobo.Git.Server/typescript-test.git",
"author": "pentode",
"license": "MIT"
}

3. TypeScript 관련 모듈 설치

- @types/node : 모듈은 node에 사용되는 TypeScript의 타입 정의를 가져오는 것입니다.
- typescript : TypeScript 모듈입니다.
- ts-node : 개발용으로 TypeSript 파일을 단계별로 읽어서 변환하고 바로 실행해주는 모듈입니다. -D 옵션은 개발용으로 빌드시 배포본에는 포함되지 않습니다.

D:\workspace\vscode\ts-test>yarn add @types/node

D:\workspace\vscode\ts-test>yarn add typescript

D:\workspace\vscode\ts-test>yarn add -D ts-node

※ 참고
TypeScript는 Node상에서 바로 실행되지 않기 때문에 tsc를 사용해서 JavaScript로 변환한 다음 실행됩니다. 프로덕션 환경에 올리기 위해서는 모든 파일을 트랜스파일(ts를 js로 변환)하게 됩니다.

ts-node는 개발용으로 사용되며 변환과 실행 두 단계를 거치지 않고, 소스를 단계별로 읽어서 변환하면서 실행합니다.

4. 타입스크립트 환경설정(tsconfig.json 생성)

- TypeScript를 JavaScript로 컴파일하기 위해 tsc와 ts-node에서 필요로하는 tsconfig.js를 만듭니다.

D:\workspace\vscode\ts-test>yarn tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2015 --module commonjs --noImplicitAny true

- "--init" : tsconfig.json 파일을 생성합니다.
- "--rootDir" : 소스 파일이 들어갈 루트 폴더 입니다.
- "--outDir" : 컴파일된 파일이 들어갈 폴더 입니다.
- "--esModuleInterop" : CommonJS 모듈을 import하기 쉽게 해줍니다.
- "--lib" : 추가 라이브러리를 지정합니다.
- "--module" : 프로그램의 모듈 시스템을 지정합니다. Node는CommonJS를 지원합니다.
- "--noImplicitAny" : 암시적으로 any 타입으로 추론되면 에러를 발생시킵니다.

- 실행결과 입니다.

yarn run v1.22.15
$ D:\workspace\vscode\ts-test\node_modules\.bin\tsc --init --rootDir src --outDir ./bin --esModuleInterop --lib ES2015 --module commonjs --noImplicitAny true

Created a new tsconfig.json with:

target: es2016
module: commonjs
lib: es6
outDir: ./bin
rootDir: src
strict: true
esModuleInterop: true
skipLibCheck: true
forceConsistentCasingInFileNames: true

You can learn more at https://aka.ms/tsconfig.json
Done in 0.31s.

D:\workspace\vscode\ts-test>

5. 소스폴더와 출력폴더 만들기

- tsconfig.js 파일에 지정한것 처럼 src 폴더와 bin 폴더를 만듭니다.

D:\workspace\vscode\ts-test>md src
D:\workspace\vscode\ts-test>md bin

6. 샘플소스 만들어서 빌드하고 실행해보기

- src 폴더에 app.ts 파일을 만듭니다. 파일 내용을 다음과 같습니다.

console.log("Hello, World!!!");

- 컴파일(JavaScript로 변환) 합니다. bin 폴더에 app.js 파일이 만들어 집니다.

D:\workspace\vscode\ts-test>yarn tsc
yarn run v1.22.15
$ D:\workspace\vscode\ts-test\node_modules\.bin\tsc
Done in 1.09s.

- 실행해 봅니다.

D:\workspace\vscode\ts-test>node ./bin/app.js
Hello, World!!!

- ts-node를 사용해서 실행해 봅니다.

D:\workspace\vscode\ts-test>yarn ts-node ./src/app.ts
yarn run v1.22.15
$ D:\workspace\vscode\ts-test\node_modules\.bin\ts-node ./src/app.ts
Hello, World!!!
Done in 1.27s.

7. yarn 에 build와 run 스크립트 추가하기

- package.json파일의 "dependencies" 위에 다음 내용을 추가합니다.

"scripts": {
"build": "tsc",
"start": "node ./bin/app.js",
"dev": "ts-node ./src/app.ts"
},

- 빌드 해봅니다.

D:\workspace\vscode\ts-test>yarn build
yarn run v1.22.15
$ tsc
Done in 1.09s.

- 컴파일된 프로그램을 실행합니다.

D:\workspace\vscode\ts-test>yarn start
yarn run v1.22.15
$ node ./bin/app.js
Hello, World!!!
Done in 0.17s.

- ts-node로 실행해 봅니다.

D:\workspace\vscode\ts-test>yarn dev
yarn run v1.22.15
$ ts-node ./src/app.ts
Hello, World!!!
Done in 1.14s.

8. yarn berry로 마이그레이션

- yarn berry로 프로젝트의 버전을 올립니다.

D:\workspace\vscode\ts-test>yarn set version berry

- PnP(플러그앤플레이) 설정을 위해 .yarnrc.yml 파일 상단에 다음을 추가합니다.

nodeLinker: pnp

- 모든 의존성을 설치합니다. node-modules 폴더가 없어집니다.

D:\workspace\vscode\ts-test>yarn install

9. Visual Studio Code에서 개발환경 설정하기

- TypeScript의존성을 vscode에서 알수 있도록 합니다.

D:\workspace\vscode\ts-test>yarn dlx @yarnpkg/sdks vscode

- ZipFS VSCode 확장을 설치합니다.
- vscode로 프로젝트 폴더를 엽니다. 새 터미널을 실행하고 "yarn start"로 실행해 봅니다.
