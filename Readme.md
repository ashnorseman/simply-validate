# Simple form fields validation tool

by: Ash

## Usage

```
npm install simply-validate
```

```javascript
import validate from 'simply-validate';

const props = {
  required: true,
  type: 'number',
  max: 5
};

expect(validate('a', props).required).toBeFalsy();
expect(validate('a', props).number).toBeTruthy();
expect(validate('a', props).max).toBeTruthy();
expect(validate('a', props).$valid).toBeFalsy();
expect(validate('a', props).$invalid).toBeTruthy();

expect(validate('', props).required).toBeTruthy();
expect(validate('', props).number).toBeFalsy();
expect(validate('', props).max).toBeFalsy();
expect(validate('', props).$valid).toBeFalsy();
expect(validate('', props).$invalid).toBeTruthy();

expect(validate('2', props).required).toBeFalsy();
expect(validate('2', props).number).toBeFalsy();
expect(validate('2', props).max).toBeFalsy();
expect(validate('2', props).$valid).toBeTruthy();
expect(validate('2', props).$invalid).toBeFalsy();
```

## Supports

```javascript
const props = {
  required: true,
  
  // Text
  maxLength: 10,
  minLength: 5,
  pattern: '^\\d+$',
  
  // Number
  max: 200,
  min: 100,
  
  // Type
  type: 'email', // number, email, url, tel, date 
};
```
