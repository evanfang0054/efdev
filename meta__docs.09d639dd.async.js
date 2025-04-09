"use strict";(self.webpackChunkefdev=self.webpackChunkefdev||[]).push([[904],{3594:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(43850),o={}},49117:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(22435),o={}},39248:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(16984),o={}},72406:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(98380),o={}},25285:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(24119),o={}},37420:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(76267),o={}},96688:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(62208),o={}},72777:function(t,n,e){e.r(n),e.d(n,{demos:function(){return o}});var d=e(75271),a=e(21447),o={}},24554:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(43850);const a=[{value:"ESLint \u914D\u7F6E\u5305\uFF0C\u63D0\u4F9B\u7EDF\u4E00\u7684\u4EE3\u7801\u89C4\u8303\u548C\u683C\u5F0F\u5316\u89C4\u5219\u3002",paraId:0,tocIndex:0},{value:"\u{1F3AF} \u7EDF\u4E00\u7684\u4EE3\u7801\u98CE\u683C\u89C4\u8303",paraId:1,tocIndex:1},{value:"\u{1F50D} \u4E25\u683C\u7684\u4EE3\u7801\u8D28\u91CF\u68C0\u67E5",paraId:1,tocIndex:1},{value:"\u26A1\uFE0F \u652F\u6301 TypeScript",paraId:1,tocIndex:1},{value:"\u{1F6E0} \u53EF\u6269\u5C55\u7684\u89C4\u5219\u914D\u7F6E",paraId:1,tocIndex:1},{value:`config-eslint/
\u251C\u2500\u2500 rules/                # ESLint \u89C4\u5219\u914D\u7F6E
\u2502   \u251C\u2500\u2500 base/            # \u57FA\u7840\u89C4\u5219
\u2502   \u2502   \u251C\u2500\u2500 best-practices.js    # \u6700\u4F73\u5B9E\u8DF5
\u2502   \u2502   \u251C\u2500\u2500 possible-errors.js   # \u53EF\u80FD\u7684\u9519\u8BEF
\u2502   \u2502   \u251C\u2500\u2500 style.js            # \u4EE3\u7801\u98CE\u683C
\u2502   \u2502   \u251C\u2500\u2500 variables.js        # \u53D8\u91CF\u76F8\u5173
\u2502   \u2502   \u251C\u2500\u2500 es6.js             # ES6+ \u7279\u6027
\u2502   \u2502   \u2514\u2500\u2500 strict.js          # \u4E25\u683C\u6A21\u5F0F
\u2502   \u2514\u2500\u2500 imports/        # \u5BFC\u5165/\u5BFC\u51FA\u89C4\u5219
\u251C\u2500\u2500 typescript/         # TypeScript \u76F8\u5173\u914D\u7F6E
\u251C\u2500\u2500 node.js            # Node.js \u73AF\u5883\u914D\u7F6E
\u251C\u2500\u2500 index.js           # \u4E3B\u914D\u7F6E\u5165\u53E3
\u251C\u2500\u2500 .eslintrc.js       # ESLint \u914D\u7F6E\u6587\u4EF6
\u251C\u2500\u2500 .eslintignore      # ESLint \u5FFD\u7565\u914D\u7F6E
`,paraId:2,tocIndex:2},{value:"\u5728\u9879\u76EE\u6839\u76EE\u5F55\u521B\u5EFA ",paraId:3,tocIndex:3},{value:".eslintrc.js",paraId:3,tocIndex:3},{value:" \u6587\u4EF6, \u5E76\u6DFB\u52A0\u4EE5\u4E0B\u914D\u7F6E:",paraId:3,tocIndex:3},{value:`pnpm add -D eslint-config-efdev@npm:@efdev/config-eslint @babel/core@7.16.0 @babel/eslint-parser@7.16.3 eslint-plugin-import@2.25.0
`,paraId:4,tocIndex:4},{value:`module.exports = {
  extends: ['efdev'],
};
`,paraId:5,tocIndex:4},{value:`pnpm add -D eslint-config-efdev@npm:@efdev/config-eslint @typescript-eslint/parser@5.0.0 @typescript-eslint/eslint-plugin@5.0.0 eslint-plugin-import@2.25.0 eslint-import-resolver-typescript@2.5.0
`,paraId:6,tocIndex:5},{value:`module.exports = {
  extends: ['efdev/typescript'],
};
`,paraId:7,tocIndex:5},{value:`pnpm add -D eslint-config-efdev@npm:@efdev/config-eslint @babel/core@7.16.0 @babel/eslint-parser@7.16.3 eslint-plugin-import@2.25.0 eslint-config-egg@10.0.0
`,paraId:8,tocIndex:6},{value:`module.exports = {
  extends: ['efdev/node'],
};
`,paraId:9,tocIndex:6},{value:`pnpm add -D eslint-config-efdev@npm:@efdev/config-eslint @typescript-eslint/parser@5.0.0 @typescript-eslint/eslint-plugin@5.0.0 eslint-plugin-import@2.25.0 eslint-import-resolver-typescript@2.5.0 eslint-config-egg@10.0.0
`,paraId:10,tocIndex:7},{value:`module.exports = {
  extends: ['efdev/node', 'efdev/typescript'],
};
`,paraId:11,tocIndex:7},{value:"\u4E3A\u4E86\u786E\u4FDD ESLint \u89C4\u5219\u4E0E Prettier \u683C\u5F0F\u5316\u89C4\u5219\u7684\u4E00\u81F4\u6027\uFF0C\u9700\u8981\u8FDB\u884C\u4EE5\u4E0B\u914D\u7F6E\uFF1A",paraId:12,tocIndex:8},{value:`# pnpm
pnpm add -D eslint-config-prettier@8.0.0 eslint-plugin-prettier@4.0.0

# npm
npm install --save-dev eslint-config-prettier@8.0.0 eslint-plugin-prettier@4.0.0

# yarn
yarn add -D eslint-config-prettier@8.0.0 eslint-plugin-prettier@4.0.0
`,paraId:13,tocIndex:9},{value:"\u4FEE\u6539 ",paraId:14,tocIndex:10},{value:".eslintrc.js",paraId:14,tocIndex:10},{value:" \u914D\u7F6E\uFF0C\u6DFB\u52A0 Prettier \u652F\u6301\uFF1A",paraId:14,tocIndex:10},{value:`// \u57FA\u7840\u9879\u76EE
module.exports = {
  extends: ['efdev', 'prettier'],
};
`,paraId:15,tocIndex:10},{value:`// TypeScript \u9879\u76EE
module.exports = {
  extends: ['efdev/typescript', 'prettier'],
};
`,paraId:16,tocIndex:10},{value:"\u6CE8\u610F",paraId:17,tocIndex:10},{value:"\uFF1A\u786E\u4FDD ",paraId:17,tocIndex:10},{value:"prettier",paraId:17,tocIndex:10},{value:" \u914D\u7F6E\u4F4D\u4E8E ",paraId:17,tocIndex:10},{value:"extends",paraId:17,tocIndex:10},{value:" \u6570\u7EC4\u7684\u6700\u540E\u4F4D\u7F6E\uFF0C\u4EE5\u907F\u514D\u5176\u4ED6\u914D\u7F6E\u8986\u76D6 Prettier \u89C4\u5219\u3002",paraId:17,tocIndex:10},{value:"efdev",paraId:18,tocIndex:11},{value:": \u57FA\u7840\u914D\u7F6E",paraId:18,tocIndex:11},{value:"efdev/typescript",paraId:18,tocIndex:11},{value:": TypeScript \u914D\u7F6E",paraId:18,tocIndex:11},{value:"efdev/node",paraId:18,tocIndex:11},{value:": Node.js \u914D\u7F6E",paraId:18,tocIndex:11},{value:"\u53EF\u4EE5\u5728\u9879\u76EE\u7684 ",paraId:19,tocIndex:12},{value:".eslintrc.js",paraId:19,tocIndex:12},{value:" \u4E2D\u8986\u76D6\u9ED8\u8BA4\u89C4\u5219\uFF1A",paraId:19,tocIndex:12},{value:`module.exports = {
  extends: ['efdev'],
  rules: {
    // \u81EA\u5B9A\u4E49\u89C4\u5219
    'no-console': 'warn',
    'no-unused-vars': 'error',
  },
};
`,paraId:20,tocIndex:12},{value:"\u6700\u4F73\u5B9E\u8DF5",paraId:21,tocIndex:14},{value:": \u5305\u542B\u4EE3\u7801\u6700\u4F73\u5B9E\u8DF5\u76F8\u5173\u89C4\u5219",paraId:21,tocIndex:14},{value:"\u53EF\u80FD\u7684\u9519\u8BEF",paraId:21,tocIndex:14},{value:": \u5E2E\u52A9\u53D1\u73B0\u4EE3\u7801\u4E2D\u6F5C\u5728\u7684\u9519\u8BEF",paraId:21,tocIndex:14},{value:"\u4EE3\u7801\u98CE\u683C",paraId:21,tocIndex:14},{value:": \u7EDF\u4E00\u7684\u4EE3\u7801\u98CE\u683C\u89C4\u8303",paraId:21,tocIndex:14},{value:"\u53D8\u91CF\u76F8\u5173",paraId:21,tocIndex:14},{value:": \u53D8\u91CF\u58F0\u660E\u548C\u4F7F\u7528\u7684\u89C4\u5219",paraId:21,tocIndex:14},{value:"ES6+",paraId:21,tocIndex:14},{value:": ES6 \u53CA\u66F4\u9AD8\u7248\u672C\u7279\u6027\u7684\u4F7F\u7528\u89C4\u8303",paraId:21,tocIndex:14},{value:"\u4E25\u683C\u6A21\u5F0F",paraId:21,tocIndex:14},{value:": \u4E0E\u4E25\u683C\u6A21\u5F0F\u76F8\u5173\u7684\u89C4\u5219",paraId:21,tocIndex:14},{value:"\u5982\u679C\u9047\u5230 ESLint \u89C4\u5219\u4E0E Prettier \u683C\u5F0F\u5316\u7ED3\u679C\u51B2\u7A81\uFF0C\u8BF7\u786E\u4FDD\uFF1A",paraId:22,tocIndex:16},{value:"\u5DF2\u6B63\u786E\u5B89\u88C5 ",paraId:23,tocIndex:16},{value:"eslint-config-prettier",paraId:23,tocIndex:16},{value:" \u548C ",paraId:23,tocIndex:16},{value:"eslint-plugin-prettier",paraId:23,tocIndex:16},{value:"\u5728 ",paraId:23,tocIndex:16},{value:".eslintrc.js",paraId:23,tocIndex:16},{value:" \u7684 ",paraId:23,tocIndex:16},{value:"extends",paraId:23,tocIndex:16},{value:" \u6570\u7EC4\u4E2D\uFF0C",paraId:23,tocIndex:16},{value:"prettier",paraId:23,tocIndex:16},{value:" \u914D\u7F6E\u4F4D\u4E8E\u6700\u540E",paraId:23,tocIndex:16},{value:".prettierrc.js",paraId:23,tocIndex:16},{value:" \u914D\u7F6E\u4E0E\u56E2\u961F\u89C4\u8303\u4E00\u81F4",paraId:23,tocIndex:16},{value:"\u5BF9\u4E8E TypeScript \u9879\u76EE\uFF0C\u786E\u4FDD\uFF1A",paraId:24,tocIndex:17},{value:"\u9879\u76EE\u6839\u76EE\u5F55\u5305\u542B\u6709\u6548\u7684 ",paraId:25,tocIndex:17},{value:"tsconfig.json",paraId:25,tocIndex:17},{value:"\u4F7F\u7528\u6B63\u786E\u7684\u914D\u7F6E\u6269\u5C55\uFF08",paraId:25,tocIndex:17},{value:"typescript",paraId:25,tocIndex:17},{value:"\uFF09",paraId:25,tocIndex:17},{value:"\u5B89\u88C5\u4E86\u6240\u9700\u7684\u4F9D\u8D56\uFF08",paraId:25,tocIndex:17},{value:"@typescript-eslint/parser",paraId:25,tocIndex:17},{value:" \u548C ",paraId:25,tocIndex:17},{value:"@typescript-eslint/eslint-plugin",paraId:25,tocIndex:17},{value:"\uFF09",paraId:25,tocIndex:17}]},4126:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(22435);const a=[{value:"\u652F\u6301\u914D\u5957\u7684 ",paraId:0,tocIndex:0},{value:"commitlint \u914D\u7F6E",paraId:0,tocIndex:0},{value:"\uFF0C\u7528\u4E8E\u5BF9 ",paraId:0,tocIndex:0},{value:"git commit message",paraId:0,tocIndex:0},{value:" \u8FDB\u884C\u6821\u9A8C\u3002",paraId:0,tocIndex:0},{value:"\u4F7F\u7528\u65F6\uFF0C\u9700\u8981\u5B89\u88C5 ",paraId:1,tocIndex:1},{value:"@commitlint/cli",paraId:1,tocIndex:1},{value:"\uFF1A",paraId:1,tocIndex:1},{value:`npm install @efdev/config-commitlint -D
`,paraId:2,tocIndex:1},{value:`npm install @commitlint/cli -D
`,paraId:3,tocIndex:1},{value:"\u5728 ",paraId:4,tocIndex:2},{value:"commitlint.config.js",paraId:4,tocIndex:2},{value:" \u4E2D\u96C6\u6210\u672C\u5305:",paraId:4,tocIndex:2},{value:`module.exports = {
  extends: ['@efdev/config-commitlint'],
};
`,paraId:5,tocIndex:2},{value:"\u53EF\u901A\u8FC7 ",paraId:6,tocIndex:3},{value:"husky",paraId:6,tocIndex:3},{value:" \u8BBE\u7F6E\u5728 ",paraId:6,tocIndex:3},{value:"git commit",paraId:6,tocIndex:3},{value:" \u65F6\u89E6\u53D1 ",paraId:6,tocIndex:3},{value:"commitlint",paraId:6,tocIndex:3},{value:"\u3002",paraId:6,tocIndex:3},{value:"\u9996\u5148\u5B89\u88C5 husky\uFF1A",paraId:7,tocIndex:3},{value:`npm install husky --save-dev
`,paraId:8,tocIndex:3},{value:"\u7136\u540E\u6267\u884C\u6DFB\u52A0",paraId:9,tocIndex:3},{value:"commit-msg",paraId:9,tocIndex:3},{value:":",paraId:9,tocIndex:3},{value:`npx husky add .husky/commit-msg 'npx commitlint --edit "\${1}"'
`,paraId:10,tocIndex:3},{value:"\u66F4\u591A\u4FE1\u606F\u53EF\u53C2\u8003 ",paraId:11,tocIndex:3},{value:"commitlint \u6587\u6863",paraId:11,tocIndex:3},{value:"\u3002",paraId:11,tocIndex:3}]},1890:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(16984);const a=[{value:"\u652F\u6301\u914D\u5957\u7684 ",paraId:0,tocIndex:0},{value:"markdownlint \u53EF\u5171\u4EAB\u914D\u7F6E",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u9700\u8981\u5148\u5168\u5C40\u5B89\u88C5 ",paraId:1,tocIndex:1},{value:"markdownlint-cli",paraId:1,tocIndex:1},{value:`npm install -g markdownlint-cli
`,paraId:2,tocIndex:1},{value:"\u518D\u5B89\u88C5 ",paraId:3,tocIndex:1},{value:"markdownlint",paraId:3,tocIndex:1},{value:"\uFF1A",paraId:3,tocIndex:1},{value:`npm install @efdev/config-markdownlint -D
`,paraId:4,tocIndex:1},{value:`npm install markdownlint -D
`,paraId:5,tocIndex:1},{value:"\u5728 ",paraId:6,tocIndex:2},{value:".markdownlint.json",paraId:6,tocIndex:2},{value:" \u4E2D\u7EE7\u627F\u672C\u5305:",paraId:6,tocIndex:2},{value:`{
  "extends": "@efdev/config-markdownlint"
}
`,paraId:7,tocIndex:2}]},62811:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(98380);const a=[{value:"\u652F\u6301\u914D\u5957\u7684 ",paraId:0,tocIndex:0},{value:"stylelint \u53EF\u5171\u4EAB\u914D\u7F6E",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u9700\u8981\u5148\u884C\u5B89\u88C5 ",paraId:1,tocIndex:1},{value:"stylelint",paraId:1,tocIndex:1},{value:" \u3001 ",paraId:1,tocIndex:1},{value:"stylelint-scss",paraId:1,tocIndex:1},{value:"\u3001 ",paraId:1,tocIndex:1},{value:"stylelint-order",paraId:1,tocIndex:1},{value:"\uFF1A",paraId:1,tocIndex:1},{value:`npm install @efdev/config-stylelint -D
`,paraId:2,tocIndex:1},{value:`npm install stylelint stylelint-scss stylelint-order -D
`,paraId:3,tocIndex:1},{value:"\u5728 ",paraId:4,tocIndex:2},{value:".stylelintrc",paraId:4,tocIndex:2},{value:" \u4E2D\u7EE7\u627F\u672C\u5305:",paraId:4,tocIndex:2},{value:`{
  "extends": "@efdev/config-stylelint"
}
`,paraId:5,tocIndex:2}]},75846:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(24119);const a=[{value:"Git \u6BCF\u6B21\u63D0\u4EA4\u4EE3\u7801\uFF0C\u90FD\u8981\u5199 Commit message\uFF0C\u5426\u5219\u4E0D\u5141\u8BB8\u63D0\u4EA4",paraId:0,tocIndex:0},{value:"\u6BCF\u6B21\u63D0\u4EA4\uFF0CCommit message \u90FD\u5305\u62EC\u4E09\u4E2A\u90E8\u5206\uFF1AHeader\uFF0CBody(\u975E\u5FC5\u586B) \u548C Footer(\u975E\u5FC5\u586B)",paraId:1,tocIndex:1},{value:"\u63D0\u4EA4\u4FE1\u606F\u6B63\u6587\u5F00\u59CB\u524D\u5FC5\u987B\u6709\u4E00\u4E2A\u7A7A\u884C",paraId:1,tocIndex:1},{value:"\u63D0\u4EA4\u4FE1\u606F\u811A\u6CE8\u5F00\u59CB\u524D\u5FC5\u987B\u6709\u4E00\u4E2A\u7A7A\u884C",paraId:1,tocIndex:1},{value:"\u4E0D\u5141\u8BB8\u7A7A\u7684\u4E3B\u9898",paraId:1,tocIndex:1},{value:"\u4E3B\u9898\u540E\u4E0D\u5141\u8BB8\u6216\u5FC5\u987B\u6709\u53E5\u53F7",paraId:1,tocIndex:1},{value:"\u4E0D\u5141\u8BB8\u7A7A\u7684\u7C7B\u578B",paraId:1,tocIndex:1},{value:`<type>(<scope>): <subject>
# \u7A7A\u4E00\u884C
<body>
# \u7A7A\u4E00\u884C
<footer>
`,paraId:2,tocIndex:1},{value:"Header \u90E8\u5206\u53EA\u6709\u4E00\u884C\uFF0C\u5305\u62EC\u4E09\u4E2A\u5B57\u6BB5\uFF1Atype\uFF08\u5FC5\u9700\uFF09\u3001scope\uFF08\u53EF\u9009\uFF09\u548C subject\uFF08\u5FC5\u9700\uFF09",paraId:3,tocIndex:2},{value:"type \u7528\u4E8E\u8BF4\u660E commit \u7684\u7C7B\u522B\uFF0C\u53EA\u5141\u8BB8\u4F7F\u7528\u4E0B\u9762 13 \u4E2A\u6807\u8BC6",paraId:4,tocIndex:3},{value:`feat\uFF1A\u65B0\u589E\u529F\u80FD
fix\uFF1Abug\u4FEE\u590D
build\uFF1A\u4E3B\u8981\u6BCD\u7684\u662F\u4FEE\u6539\u9879\u76EE\u6784\u5EFA\u7CFB\u7EDF\uFF08\u4F8B\u5982glup\uFF0Cwebpack\uFF0Crollup\uFF0Ctsconfig\u7684\u914D\u7F6E\u7B49\uFF09\u7684\u63D0\u4EA4
merge\uFF1A\u5206\u652F\u5408\u5E76
upd\uFF1A\u66F4\u65B0\u67D0\u529F\u80FD\uFF08\u4E0D\u662Ffeat\uFF0C\u4E0D\u662Ffix\uFF09
test\uFF1A\u65B0\u589E\u6D4B\u8BD5\u7528\u4F8B\u6216\u66F4\u65B0\u73B0\u6709\u6D4B\u8BD5
ci\uFF1A\u4E3B\u8981\u76EE\u7684\u662F\u4FEE\u6539\u9879\u76EE\u6301\u7EED\u96C6\u6210\u6D41\u7A0B\uFF08\u4F8B\u5982Travis\uFF0CJenkins\uFF0CGitlab CI\uFF0CCircle\u7B49\uFF09\u7684\u63D0\u4EA4
docs\uFF1A\u6587\u6863\u66F4\u65B0
perf\uFF1A\u6027\u80FD\uFF0C\u4F53\u9A8C\u4F18\u5316
refactor\uFF1A\u91CD\u6784\u4EE3\u7801
style\uFF1A\u4E0D\u5F71\u54CD\u7A0B\u5EA6\u903B\u8F91\u7684\u4EE3\u7801\u4FEE\u6539\uFF08\u4FEE\u6539\u7A7A\u767D\u5B57\u7B26\uFF0C\u683C\u5F0F\u7F29\u8FDB\uFF0C\u8865\u5168\u7F3A\u5931\u7684\u5206\u53F7\u7B49\uFF0C\u6CA1\u6709\u6539\u53D8\u4EE3\u7801\u903B\u8F91\uFF09
revert\uFF1A\u56DE\u6EDA\u67D0\u4E2A\u66F4\u65E9\u4E4B\u524D\u7684\u7248\u672C
chore\uFF1A\u6784\u5EFA\u8FC7\u7A0B\u6216\u8F85\u52A9\u5DE5\u5177\u7684\u53D8\u52A8
`,paraId:5,tocIndex:3},{value:"scope \u7528\u4E8E\u8BF4\u660E commit \u5F71\u54CD\u7684\u8303\u56F4\uFF0C\u6BD4\u5982\u6570\u636E\u5C42\u3001\u63A7\u5236\u5C42\u3001\u89C6\u56FE\u5C42\u7B49\u7B49\uFF0C\u89C6\u9879\u76EE\u4E0D\u540C\u800C\u4E0D\u540C",paraId:6,tocIndex:4},{value:"subject \u662F commit \u76EE\u7684\u7684\u7B80\u77ED\u63CF\u8FF0\uFF0C\u4E0D\u8D85\u8FC7 100 \u4E2A\u5B57\u7B26",paraId:7,tocIndex:5}]},48422:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(76267);const a=[{value:"\u9879\u76EE\u6587\u6863\u5EFA\u8BAE\u4F7F\u7528",paraId:0,tocIndex:0},{value:"dumi",paraId:0,tocIndex:0},{value:"\u8FDB\u884C\u7F16\u5199",paraId:0,tocIndex:0},{value:"\u591A\u68C0\u67E5\uFF0C\u786E\u4FDD\u6CA1\u6709\u9519\u522B\u5B57",paraId:1,tocIndex:1},{value:"\u8A00\u7B80\u610F\u8D45",paraId:1,tocIndex:1},{value:"\u6CE8\u610F\u7279\u6B8A\u540D\u8BCD\u7684\u5927\u5C0F\u5199\uFF1AAJAX\u3001Highcharts\u3001React\u3001JavaScript\u3001HTML\uFF0C\u65E0\u8BBA\u662F\u5426\u5728\u53E5\u9996\u90FD\u5E94\u8BE5\u4EE5\u540C\u6837\u7684\u65B9\u5F0F\u5199\uFF08\u6709 lint \u5DE5\u5177\u9650\u5236\uFF09",paraId:1,tocIndex:1},{value:"\u53EA\u6709\u4E2D\u6587\u6216\u4E2D\u82F1\u6587\u6DF7\u6392\u4E2D\uFF0C\u4E00\u5F8B\u4F7F\u7528\u4E2D\u6587/\u5168\u89D2\u6807\u70B9",paraId:1,tocIndex:1},{value:"\u4E25\u683C\u9075\u5FAA",paraId:2,tocIndex:2},{value:"markdownlint",paraId:2,tocIndex:2},{value:"\u683C\u5F0F",paraId:2,tocIndex:2},{value:`[
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Vue.js",
  "Angular",
  "jQuery",
  "Bootstrap",
  "Sass",
  "Less",
  "Webpack",
  "Babel",
  "NPM",
  "Yarn",
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "ESLint",
  "Prettier",
  "Node.js",
  "Express",
  "Koa",
  "Next.js",
  "Nuxt.js",
  "Gatsby",
  "TypeScript",
  "Ember.js",
  "Backbone.js",
  "Marionette.js",
  "React Native",
  "Ionic",
  "Cordova",
  "Electron",
  "Tailwind CSS",
  "Foundation",
  "Materialize",
  "Semantic UI",
  "Ant Design",
  "Figma",
  "Sketch",
  "Adobe XD",
  "InVision",
  "Zeplin",
  "Storybook",
  "Jest",
  "Mocha",
  "Chai",
  "Sinon",
  "Enzyme",
  "React Testing Library",
  "Cypress",
  "Selenium",
  "Puppeteer",
  "WebdriverIO",
  "Redux",
  "MobX",
  "Vuex",
  "NgRx",
  "Apollo Client",
  "Relay",
  "GraphQL",
  "RESTful API",
  "AJAX",
  "Fetch API",
  "XMLHttpRequest",
  "Socket.IO",
  "D3.js",
  "Three.js",
  "Chart.js",
  "Highcharts",
  "jQuery UI",
  "Lodash",
  "Underscore.js",
  "Moment.js",
  "Date-fns",
  "Numeral.js",
  "Axios",
  "jQuery.ajax",
  "Vue Router",
  "React Router",
  "Angular Router",
  "History API",
  "Service Workers",
  "Web Workers",
  "WebAssembly",
  "CSS Grid",
  "CSS Flexbox",
  "BEM",
  "OOCSS",
  "SMACSS",
  "Atomic Design",
  "PostCSS",
  "Autoprefixer",
  "CSS Modules",
  "Styled Components",
  "Emotion",
  "JSS",
  "CSS-in-JS",
  "Shadow DOM",
  "Custom Elements",
  "HTML Imports",
  "Template Literals",
  "Tagged Templates",
  "Async/Await",
  "Promises",
  "Generators",
  "Proxies",
  "Maps",
  "Sets",
  "WeakMaps",
  "WeakSets",
  "Symbols",
  "BigInt",
  "Intl",
  "URL",
  "URLSearchParams",
  "Blob",
  "FileReader",
  "Canvas",
  "WebGL",
  "Web Animations API",
  "Intersection Observer API",
  "Resize Observer",
  "Mutation Observer",
  "Pointer Events",
  "Touch Events",
  "Media Queries",
  "CSS Variables",
  "Web Storage API",
  "IndexedDB",
  "Cache API",
  "Web SQL Database",
  "File System Access API",
  "WebRTC",
  "Speech API",
  "WebXR",
  "Web Payments",
  "Web Authentication",
  "Web Notifications",
  "Progressive Web Apps",
  "Workbox",
  "Lighthouse",
  "Google Tag Manager",
  "Adobe Dreamweaver",
  "Brackets",
  "Visual Studio Code",
  "Atom",
  "Sublime Text",
  "WebStorm",
  "Eslint-plugin-react",
  "Vue Server Renderer",
  "Angular Universal",
  "Preact",
  "Svelte",
  "11ty",
  "Hugo",
  "Gatsby Image",
  "Netlify CMS",
  "Contentful",
  "Dockerize",
  "Jamstack",
  "AMP",
  "Polyfill"
]
`,paraId:3,tocIndex:3}]},15481:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(62208);const a=[{value:"\u4E2A\u4EBA\u98CE\u683C\u9879\u76EE\u5DE5\u5177/\u914D\u7F6E",paraId:0,tocIndex:0}]},32871:function(t,n,e){e.r(n),e.d(n,{texts:function(){return a}});var d=e(21447);const a=[]}}]);
