const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 9000;

app.post("/api/compile", (req, res) => {
  const { code } = req.body;

  // 将用户提交的代码写入文件
  const fileName = path.resolve(__dirname, "../src/code/compile.c");
  // const exe = path.resolve(__dirname, "../src/code/compiled");
  const compiled = path.resolve(__dirname, "../src/code/compiled");
  fs.writeFileSync(fileName, code);

  console.log(code, "params");
  // 调用系统命令编译代码
  exec(
    // `gcc ./compile.c -o compiled`,
    `gcc ${fileName} -o ${compiled}`,
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
  // 执行编译后的程序
  // exec(compiled, { encoding: "utf8" }, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`执行错误: ${stderr}`);
  //     res.send({ result: "执行错误", error: stderr });
  //     return;
  //   }
  //   console.log(`执行结果: ${stdout}`);
  //   res.send({ result: "成功", output: stdout });
  // });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
