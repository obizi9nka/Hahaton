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
                    sitekey="6LdlpUkjAAAAAKpYpOF0UwnEBigt5z6S7Dg2-N-g"
                    onChange={onChange}
                />
            </div>
        </div >
    )
}
