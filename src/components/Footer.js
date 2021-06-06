var style = {
    backgroundColor: "#999aa1",
    borderTop: "4px solid #E7E7E7",
    textAlign: "center",
  
    width: "100%",
}


function Footer({ children }) {
    return (
        <div>
            <div  className="fixed-bottom"/>
            <div style={style}>
                <br/>
                <p>
                ggmu
                </p>
                <p>
                ggmu
                </p>
                <p>
                ggmu
                </p>
                <br/>
            </div>
        </div>
    )
}

export default Footer