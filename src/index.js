/**
 * Created by AshZhang on 2016-4-15.
 */


const

	// source: http://emailregex.com/
	EMAIL_REG = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,

	// source: http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
	// modified: optional protocol
	URL_REG = /^((https?:)?\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i,

	// mobile | telephone with optional district code (including hk and macao)
	TEL_REG = /(^1[3-9]\d{9}$)|(^([08][1-9]\d{1,2}-?)?[2-9]\d{6,7}$)/;


/**
 * Validator a form value
 * @param {string|*} value
 * @param {Object} props - validation settings
 * @returns {Object} validation result
 * - e.g. {
 *   required: false,		// valid
 *   maxLength: true		// invalid
 * }
 */
module.exports = function validate(value = '', props = {}) {
	const valueStr = (value + '').trim(),
		valueNum = +value,
		result = {};

	// Do not validate empty values if `required` is set to `false`
	if ((props.required || valueStr) && Object.keys(props).length) {
		result.required = !!(props.required && !valueStr);

		result.maxLength = props.maxLength !== void 0 && valueStr.length > props.maxLength;

		result.minLength = props.minLength !== void 0 && valueStr.length < props.minLength;

		result.max = props.max !== void 0 && (isNaN(valueNum) || valueNum > props.max);

		result.min = props.min !== void 0 && (isNaN(valueNum) || valueNum < props.min);

		result.pattern = props.pattern !== void 0 && !(new RegExp(props.pattern).test(valueStr));

		switch (props.type) {
		case 'number':
			result.number = isNaN(valueNum);
			break;
		case 'email':
			result.email = !EMAIL_REG.test(valueStr);
			break;
		case 'url':
			result.url = !URL_REG.test(valueStr);
			break;
		case 'tel':
			result.tel = !TEL_REG.test(valueStr);
			break;
		case 'date':
			result.date = isNaN(new Date(value).valueOf());
			break;
		}
	}

	result.$valid = !Object.keys(result).filter(prop => result[prop]).length;
	result.$invalid = !result.$valid;

	return result;
};
