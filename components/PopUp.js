import Script from "next/script";

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
                <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld8s0UjAAAAAE0ldc76WOG9yz33MWUrgBp-VU1t" />
                {/* <script>
                    grecaptcha.enterprise.ready(function() {
                        grecaptcha.enterprise.execute('6Ld8s0UjAAAAAE0ldc76WOG9yz33MWUrgBp-VU1t', { action: 'login' }).then(function (token) {
                        })
                    })
                </script> */}
            </div>
        </div >
    )
}
