
export default function PopUp({ znachok, setZnachok }) {

    return (
        <div className={znachok != null ? "modall active" : "modall"} onClick={() => {
            setZnachok(null)
            if (localStorage.getItem("overflow") != "lock")
                document.body.style.overflow = ('overflow', 'auto');
            else
                document.body.style.overflow = ('overflow', 'hidden');
        }}>
            <div className="znachokAlert" onClick={e => e.stopPropagation()} >
            </div>
        </div >
    )
}
