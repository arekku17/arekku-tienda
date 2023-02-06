import React from 'react'
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from 'react-loader-spinner';


const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                marginTop: "30px",
                justifyContent: "center"
            }}
        >
            {
                (promiseInProgress === true) ?
                    <ThreeDots height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true} />
                    :
                    null
            }
        </div>
    )
}

export default LoadingIndicator;