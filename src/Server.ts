import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import  cors from 'cors';
dotenv.config();

interface VerifycodeBodyParams {
  code: string;
}

const WHITELIST = process.env.WHITELIST || '';
const PORT = process.env.PORT || 4000;

const app: express.Application = express();

console.log(WHITELIST.split(','))
app.use(bodyParser.json())
app.use(cors({
  origin: WHITELIST.split(',')
}));

app.post('/api/verifycode', function (req, res) {
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

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});