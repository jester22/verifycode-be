import express from 'express';
import bodyParser from 'body-parser';

interface VerifycodeBodyParams {
  code: string;
}

const app: express.Application = express();

app.use(bodyParser.json())

app.post('/verifycode', function (req, res) {
  const { code } = req.body as VerifycodeBodyParams;
  const numbersOnly = code.match(/^\d+$/);
  if(numbersOnly && code.length === 6 && code.charAt(code.length - 1) !== '7') {
    res.status(200).json({
      message: 'Successfully verified code'
    });
  }
  else {
    res.status(400).json({
      message: 'Verification Error'
    });
  }
});

app.listen(4000, function () {
  console.log('App is listening on port 4000!');
});