/**
 * Created by AshZhang on 2016-4-15.
 */


import validate from '../index';


describe('validate', () => {

	it('no requirement', () => {
		expect(validate('', {}).$valid).toBeTruthy();
		expect(validate('', {}).$invalid).toBeFalsy();

		expect(validate('ABC', {}).$valid).toBeTruthy({});
		expect(validate('ABC', {}).$invalid).toBeFalsy({});
	});

	it('required', () => {
		const props = {
			required: true
		};

		expect(validate('', props).required).toBeTruthy();
		expect(validate(false, props).required).toBeFalsy();
		expect(validate(0, props).required).toBeFalsy();
		expect(validate('ABC', props).required).toBeFalsy();
	});

	it('maxLength', () => {
		const props = {
			maxLength: 5
		};

		expect(validate('', props).maxLength).toBeFalsy();
		expect(validate('ABC', props).maxLength).toBeFalsy();
		expect(validate('ABCDE', props).maxLength).toBeFalsy();
		expect(validate('ABCDEFG', props).maxLength).toBeTruthy();
	});

	it('minLength', () => {
		const props = {
			minLength: 5
		};

		expect(validate('', props).minLength).toBeFalsy();
		expect(validate('ABC', props).minLength).toBeTruthy();
		expect(validate('ABCDE', props).minLength).toBeFalsy();
		expect(validate('ABCDEFG', props).minLength).toBeFalsy();
	});

	it('max', () => {
		const props = {
			max: 5
		};

		expect(validate('', props).max).toBeFalsy();
		expect(validate(1, props).max).toBeFalsy();
		expect(validate('1', props).max).toBeFalsy();
		expect(validate(5, props).max).toBeFalsy();
		expect(validate('5', props).max).toBeFalsy();
		expect(validate(10, props).max).toBeTruthy();
		expect(validate('10', props).max).toBeTruthy();
		expect(validate('ABC', props).max).toBeTruthy();
	});

	it('min', () => {
		const props = {
			min: 5
		};

		expect(validate('', props).min).toBeFalsy();
		expect(validate(1, props).min).toBeTruthy();
		expect(validate('1', props).min).toBeTruthy();
		expect(validate(5, props).min).toBeFalsy();
		expect(validate('5', props).min).toBeFalsy();
		expect(validate(10, props).min).toBeFalsy();
		expect(validate('10', props).min).toBeFalsy();
		expect(validate('ABC', props).min).toBeTruthy();
	});

	it('pattern', () => {
		const props = {
			pattern: '^\\d+$'
		};

		expect(validate('', props).pattern).toBeFalsy();
		expect(validate(1, props).pattern).toBeFalsy();
		expect(validate('1', props).pattern).toBeFalsy();
		expect(validate('ABC', props).pattern).toBeTruthy();
	});

	it('email', () => {
		const props = {
			type: 'email'
		};

		expect(validate('', props).email).toBeFalsy();
		expect(validate('abc', props).email).toBeTruthy();
		expect(validate('abc@abc', props).email).toBeTruthy();
		expect(validate('@abc.com', props).email).toBeTruthy();
		expect(validate('@abc.com.cn', props).email).toBeTruthy();
		expect(validate('abc@abc.com', props).email).toBeFalsy();
		expect(validate('abc@abc.com.cn', props).email).toBeFalsy();
	});

	it('url', () => {
		const props = {
			type: 'url'
		};

		expect(validate('', props).url).toBeFalsy();
		expect(validate('abc', props).url).toBeTruthy();
		expect(validate('abc.com', props).url).toBeFalsy();
		expect(validate('www.abc.com', props).url).toBeFalsy();
		expect(validate('//www.abc.com', props).url).toBeFalsy();
		expect(validate('http://www.abc.com', props).url).toBeFalsy();
		expect(validate('https://www.abc.com', props).url).toBeFalsy();
	});

	it('number', () => {
		const props = {
			type: 'number'
		};

		expect(validate('', props).number).toBeFalsy();
		expect(validate(0, props).number).toBeFalsy();
		expect(validate('0', props).number).toBeFalsy();
		expect(validate(123, props).number).toBeFalsy();
		expect(validate('123', props).number).toBeFalsy();
		expect(validate('abc', props).number).toBeTruthy();
	});

	it('tel', () => {
		const props = {
			type: 'tel'
		};

		expect(validate('', props).tel).toBeFalsy();
		expect(validate('1234567', props).tel).toBeTruthy();
		expect(validate('2234567', props).tel).toBeFalsy();
		expect(validate('12345678', props).tel).toBeTruthy();
		expect(validate('22345678', props).tel).toBeFalsy();
		expect(validate('00234567890', props).tel).toBeTruthy();
		expect(validate('13800000000', props).tel).toBeFalsy();
		expect(validate('abc', props).tel).toBeTruthy();
	});

	it('date', () => {
		const props = {
			type: 'date'
		};

		expect(validate('', props).date).toBeFalsy();
		expect(validate('abc', props).date).toBeTruthy();
		expect(validate('2016-01-01', props).date).toBeFalsy();
		expect(validate(new Date(), props).date).toBeFalsy();
	});

	it('multiple', () => {
		const props = {
			required: true,
			type: 'number',
			max: 5
		};

		expect(validate('a', props).required).toBeFalsy();
		expect(validate('a', props).number).toBeTruthy();
		expect(validate('a', props).max).toBeTruthy();

		expect(validate('', props).required).toBeTruthy();
		expect(validate('', props).number).toBeFalsy();
		expect(validate('', props).max).toBeFalsy();
	});

	it('.$valid & .$invalid: test if a field is valid', () => {
		const props = {
			required: true,
			maxLength: 5
		};

		expect(validate('', props).$valid).toBeFalsy();
		expect(validate('ABCDEFG', props).$valid).toBeFalsy();
		expect(validate('ABCDEFG', props).$invalid).toBeTruthy();
		expect(validate('ABC', props).$valid).toBeTruthy();
		expect(validate('ABC', props).$invalid).toBeFalsy();

		expect(validate('', {}).$valid).toBeTruthy();
		expect(validate('ABC', {}).$invalid).toBeFalsy({});
	});
});
