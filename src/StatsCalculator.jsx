import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';

const StatsCalculator = () => {
  // State management
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [result, setResult] = useState(null);
  const [permValues, setPermValues] = useState({ n: '', r: '' });
  const [sampleValues, setSampleValues] = useState({
    p: '',
    z: '',
    w: '',
    n: '',
  });
  const [activeTab, setActiveTab] = useState(0);

  // Helper functions
  const fact = (n) => {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact = fact * i;
    }
    return fact;
  };

  const perm = (n, r) => fact(n) / fact(n - r);
  const comb = (n, r) => fact(n) / (fact(r) * fact(n - r));

  // Basic stats calculations
  const calculateMean = () => {
    if (numbers.length === 0) return;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    setResult(`Mean: ${(sum / numbers.length).toFixed(2)}`);
  };

  const calculateMedian = () => {
    if (numbers.length === 0) return;
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    setResult(`Median: ${median.toFixed(2)}`);
  };

  const calculateMode = () => {
    if (numbers.length === 0) return;
    const frequency = {};
    numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    let maxFreq = 0;
    let mode = null;
    Object.entries(frequency).forEach(([num, freq]) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        mode = parseInt(num, 10);
      }
    });
    setResult(`Mode: ${mode}`);
  };

  const calculateRange = () => {
    if (numbers.length === 0) return;
    const sorted = [...numbers].sort((a, b) => a - b);
    setResult(`Range: ${sorted[sorted.length - 1] - sorted[0]}`);
  };

  // Handle number input
  const handleAddNumber = () => {
    if (currentNumber && !isNaN(Number(currentNumber))) {
      setNumbers([...numbers, parseFloat(currentNumber)]);
      setCurrentNumber('');
    }
  };

  // Calculate permutation/combination
  const calculatePermComb = (type) => {
    const n = parseInt(permValues.n, 10);
    const r = parseInt(permValues.r, 10);
    if (isNaN(n) || isNaN(r)) return;
    const result = type === 'perm' ? perm(n, r) : comb(n, r);
    setResult(
      `${type === 'perm' ? 'Permutation' : 'Combination'}: ${result}`
    );
  };

  // Calculate sample size and confidence interval
  const calculateSampleStats = () => {
    const { p, z, w, n } = sampleValues;
    const pVal = parseFloat(p);
    const zVal = parseFloat(z);
    const wVal = parseFloat(w);
    const nVal = parseInt(n, 10);

    if ([pVal, zVal, wVal].some(isNaN)) return;

    const q = 1 - pVal;
    const nPlus =
      (2 * Math.pow(zVal, 2) * pVal * q -
        Math.pow(zVal, 2) * Math.pow(wVal, 2) +
        Math.sqrt(
          4 *
            Math.pow(zVal, 4) *
            pVal *
            q *
            (pVal * q - Math.pow(wVal, 2)) +
            Math.pow(wVal, 2) * Math.pow(zVal, 4)
        )) /
      Math.pow(wVal, 2);

    if (!isNaN(nVal)) {
      const ciMinus = pVal - zVal * Math.sqrt((pVal * q) / nVal);
      const ciPlus = pVal + zVal * Math.sqrt((pVal * q) / nVal);
      setResult(
        `Sample Size: ${Math.ceil(nPlus)}\nConfidence Interval: (${ciMinus.toFixed(
          4
        )}, ${ciPlus.toFixed(4)})`
      );
    } else {
      setResult(`Required Sample Size: ${Math.ceil(nPlus)}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Typography variant="h5">Statistical Calculator</Typography>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
          <Tab label="Basic Stats" />
          <Tab label="Permutations & Combinations" />
          <Tab label="Sample Size & CI" />
        </Tabs>

        <Box hidden={activeTab !== 0}>
          <Box display="flex" gap={2} marginY={2}>
            <TextField
              type="number"
              value={currentNumber}
              onChange={(e) => setCurrentNumber(e.target.value)}
              label="Enter a number"
            />
            <Button variant="contained" onClick={handleAddNumber}>
              Add
            </Button>
          </Box>
          <Box display="flex" gap={2}>
            <Button onClick={calculateMean}>Mean</Button>
            <Button onClick={calculateMedian}>Median</Button>
            <Button onClick={calculateMode}>Mode</Button>
            <Button onClick={calculateRange}>Range</Button>
          </Box>
          {numbers.length > 0 && (
            <Alert severity="info">Current numbers: {numbers.join(', ')}</Alert>
          )}
        </Box>

        <Box hidden={activeTab !== 1}>
          <TextField
            type="number"
            value={permValues.n}
            onChange={(e) =>
              setPermValues({ ...permValues, n: e.target.value })
            }
            label="Total objects (n)"
          />
          <TextField
            type="number"
            value={permValues.r}
            onChange={(e) =>
              setPermValues({ ...permValues, r: e.target.value })
            }
            label="Objects chosen (r)"
          />
          <Box display="flex" gap={2}>
            <Button onClick={() => calculatePermComb('perm')}>
              Calculate Permutation
            </Button>
            <Button onClick={() => calculatePermComb('comb')}>
              Calculate Combination
            </Button>
          </Box>
        </Box>

        <Box hidden={activeTab !== 2}>
          <TextField
            type="number"
            value={sampleValues.p}
            onChange={(e) =>
              setSampleValues({ ...sampleValues, p: e.target.value })
            }
            label="p value"
          />
          <TextField
            type="number"
            value={sampleValues.z}
            onChange={(e) =>
              setSampleValues({ ...sampleValues, z: e.target.value })
            }
            label="z value"
          />
          <TextField
            type="number"
            value={sampleValues.w}
            onChange={(e) =>
              setSampleValues({ ...sampleValues, w: e.target.value })
            }
            label="width"
          />
          <TextField
            type="number"
            value={sampleValues.n}
            onChange={(e) =>
              setSampleValues({ ...sampleValues, n: e.target.value })
            }
            label="sample size (optional)"
          />
          <Button onClick={calculateSampleStats}>Calculate</Button>
        </Box>

        {result && (
          <Alert severity="success" style={{ marginTop: '16px' }}>
            {result}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCalculator;
