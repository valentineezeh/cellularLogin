import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ field, value, label, placeholder, error, type, onChange }) => {
    return (
        <div className={classnames({ 'errorPTag': error })} >
            <label ><b>{label}</b>
            </label>
            <input

                type={type}
                placeholder={placeholder}
                name={field}
                value={value}
                onChange={onChange}
                required />

            {error && <p className="errorPTag">{error}</p>}
        </div>
    )
}

TextField.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    error: PropTypes.array,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
    type: 'text'
}

export default TextField;
