import Script from "next/script";
import ReCAPTCHA from "react-google-recaptcha";

export default function PopUp({ znachok, setZnachok }) {

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    return (
        <div className={znachok != null ? "modall active" : "modall"} onClick={() => {
            setZnachok(null)
            if (localStorage.getItem("overflow") != "lock")
                document.body.style.overflow = ('overflow', 'auto');
            else
                document.body.style.overflow = ('overflow', 'hidden');
        }}>

            <div className="znachokAlert" onClick={e => e.stopPropagation()} >
                <ReCAPTCHA
                    // sitekey="6Ld8s0UjAAAAAE0ldc76WOG9yz33MWUrgBp-VU1t"
                    sitekey="6Ld_eUkjAAAAAAIUJO8yBhVSR8HW3h_YihP1kYlm"
                    onChange={onChange}
                />


                {/* <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Ld8s0UjAAAAAE0ldc76WOG9yz33MWUrgBp-VU1t" />
                {
                    grecaptcha.enterprise.ready(function () {
                        grecaptcha.enterprise.execute('6Ld8s0UjAAAAAE0ldc76WOG9yz33MWUrgBp-VU1t', { action: 'login' }).then(function (token) {
                        })
                    })
                } */}
            </div>
        </div >
    )
}
