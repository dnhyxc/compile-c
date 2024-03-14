const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { VM } = require("vm2");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 9000;

app.post("/api/compile", (req, res) => {
  const { code } = req.body;
  // 保存需要运行代码文件的文件夹
  const folderPath = path.join(__dirname, "../src/code");
  // 编译前的文件路径
  const filePath = path.join(folderPath, "compile.c");
  // 编译后的文件路径
  const compiled = `${folderPath}/compiled`;

  // 检查文件夹是否存在
  if (!fs.existsSync(folderPath)) {
    // 如果文件夹不存在，则创建文件夹
    fs.mkdirSync(folderPath);
    // 写入代码到 compile.c 文件中
    fs.writeFileSync(filePath, code);
  } else {
    fs.writeFileSync(filePath, code);
  }

  // 调用系统命令编译代码
  exec(
    `gcc ${filePath} -o ${compiled}`,
    { encoding: "utf8" },
    (error, stdout, stderr) => {
      console.log(stderr, "stderr");
      if (error) {
        console.error(`编译错误: ${stderr}`);
        res.send({ result: "编译错误", error: stderr });
        return;
      }
      // 执行编译后的程序
      exec(compiled, { encoding: "utf8" }, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行错误: ${stderr}`);
          res.send({ result: "执行错误", error: stderr });
          return;
        }
        console.log(`执行结果: ${stdout}`);
        res.send({ result: "成功", output: stdout });
      });
    }
  );
});

const codeRun = (code) => {
  const vm = new VM({
    compiler: "javascript",
    sandbox: {
      name: "dnhyxc",
    },
  });
  // 执行 JavaScript 代码
  const result = vm.run(code);
  return result;
};

app.post("/api/compileJs", (req, res) => {
  const { code } = req.body;

  const result = codeRun(code);

  res.send({ success: true, output: result });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
