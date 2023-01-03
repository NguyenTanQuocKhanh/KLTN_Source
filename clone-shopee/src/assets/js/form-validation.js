export function Validator(options) {
    function getParentElement(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // function set error message
    function Validate(inputElement, rule) {
        // console.log(rule);
        // console.log(inputElement);
        var parentElement = getParentElement(inputElement, options.formGroupSelector);

        var errorMessage;
        //lấy ra các rule của selector
        var rules = selectorRules[rule.selector];
        var length = rules.length;

        // lặp và check qua từng rule
        for (let i = 0; i < length; i++) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
                    break;
            }

            if (errorMessage) {
                break;
            }
        }
        if (parentElement) {
            var errorElement = parentElement.querySelector(options.errorSelector);
            if (errorMessage) {
                errorElement.innerText = errorMessage;
                parentElement.classList.add(options.errorClass);
            } else {
                errorElement.innerText = '';
                parentElement.classList.remove(options.errorClass);
            }
        }

        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;
            // valid bộ field
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = Validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    // lập qua từng input có property name
                    // TH: input thì chỉ có 1 name
                    // TH: 1 group radio thì sẽ có nhiều name nhưng ta chỉ lấy name mà đã được người dùng checked
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValue = Array.from(enableInputs).reduce(function (value, input) {
                        switch (input.type) {
                            case 'radio':
                                var check = formElement.querySelector('input[name="' + input.name + '"]:checked');
                                value[input.name] = check ? check.value : '';
                                break;
                            case 'checkbox':
                                if (!Array.isArray(value[input.name])) {
                                    value[input.name] = [];
                                }
                                if (!input.matches(':checked')) {
                                    return value;
                                }
                                value[input.name].push(input.value);
                                break;
                            case 'file':
                                value[input.name] = input.files[0];
                                break;
                            default:
                                value[input.name] = input.value;
                                break;
                        }
                        return value;
                    }, {});
                    options.onSubmit(formValue);
                } else {
                    //event submit default form
                    formElement.submit();
                }
            }
        };

        // xử lý lặp qua mỗi rule
        options.rules.forEach(function (rule) {
            // lưu rule vào mảng
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function (inputElement) {
                // xử lý khi blur ra ngoài
                inputElement.onblur = function () {
                    Validate(inputElement, rule);
                };

                //xử lý khi đang nhập
                inputElement.oninput = function () {
                    var parentElement = getParentElement(inputElement, options.formGroupSelector);
                    if (parentElement) {
                        var errorElement = parentElement.querySelector(options.errorSelector);
                        errorElement.innerText = '';
                        parentElement.classList.remove(options.errorClass);
                    }
                };
            });
        });
    }
}

// khi có lỗi==>message lỗi else ==>undefine
Validator.isRequired = function (selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email';
        },
    };
};

Validator.minLength = function (selector, min, message) {
    return {
        selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập nhiều hơn ${min} ký tự`;
        },
    };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Gía trị không đúng';
        },
    };
};

export default Validator;
