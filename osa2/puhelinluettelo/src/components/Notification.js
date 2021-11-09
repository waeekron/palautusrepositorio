const Notification = ({message, succeeded}) => {
    if (message === null) {
        return null
    }
    console.log(succeeded)
    if (succeeded === true) {
        return (
            <div className="succes">
                {message}
            </div>
        )
    }


    return (
        <div className="error">
            {message}
        </div>
    )
}

export default Notification