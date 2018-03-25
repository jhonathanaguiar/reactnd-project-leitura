import React, { Component } from 'react';

class ActionButtons extends Component {
    static contextTypes = {
        router: () => null
    };

    render() {
        const { successBtnLabel = "Ok",
                cancelBtnLabel = "Cancel",
                successFunction = (() => {}),
                isValid = false,
        } = this.props;

        const cancelFunction = this.props.cancelFunction ? this.props.cancelFunction : this.context.router.history.goBack;

        return(
            <div className="form-buttons">
                <button className="button button-success"
                        onClick={successFunction}
                        disabled={!isValid}>
                    {successBtnLabel}
                </button>
                <button className="button button-cancel"
                        onClick={cancelFunction}>{cancelBtnLabel}
                </button>
            </div>
        )
    }
}

export default ActionButtons