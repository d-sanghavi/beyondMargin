import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, DrawnCheck } from '../shared/ui'
import { IconPhone } from '../shared/icons'
import { OtpInput } from '../features/OtpInput'
import { delay } from '../shared/hooks'

type Stage = 'phone' | 'otp' | 'verifying' | 'done'

export default function SignIn() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<Stage>('phone')
  const [phone, setPhone] = useState('')
  const [countdown, setCountdown] = useState(30)

  const startOtp = () => {
    setStage('otp')
    setCountdown(30)
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const verify = async () => {
    setStage('verifying')
    await delay(900)
    setStage('done')
    await delay(900)
    navigate('/consent')
  }

  return (
    <div className="flex h-full flex-col bg-appbg px-6">
      <div className="pt-12 lg:pt-16">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-info text-navy">
          <IconPhone size={28} />
        </div>
      </div>

      {stage === 'phone' && (
        <div className="mt-6">
          <h1 className="text-2xl">Sign in</h1>
          <p className="mt-2 text-sm text-muted">We&apos;ll send a one-time code to your mobile number.</p>
          <div className="mt-8 flex items-center gap-2 rounded-btn border border-rule bg-white px-3 focus-within:border-saffron">
            <span className="text-navy font-semibold">+91</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              inputMode="numeric"
              placeholder="10-digit number"
              className="h-14 flex-1 bg-transparent text-lg outline-none"
            />
          </div>
          <Button full className="mt-6" disabled={phone.length !== 10} onClick={startOtp}>
            Send OTP
          </Button>
        </div>
      )}

      {stage === 'otp' && (
        <div className="mt-6">
          <h1 className="text-2xl">Enter the code</h1>
          <p className="mt-2 text-sm text-muted">Sent to +91 {phone}. (Demo: type any 6 digits.)</p>
          <div className="mt-8">
            <OtpInput onComplete={() => {}} />
          </div>
          <div className="mt-4 text-center text-sm text-muted">
            {countdown > 0 ? (
              <span>Resend code in {countdown}s</span>
            ) : (
              <button className="font-semibold text-saffron" onClick={startOtp}>
                Resend code
              </button>
            )}
          </div>
          <Button full className="mt-6" onClick={verify}>
            Verify
          </Button>
        </div>
      )}

      {stage === 'verifying' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <motion.div
            className="h-12 w-12 rounded-full border-4 border-info border-t-saffron"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          />
          <p className="text-sm text-muted">Verifying…</p>
        </div>
      )}

      {stage === 'done' && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <DrawnCheck />
          <p className="text-lg font-semibold text-navy">Verified</p>
        </div>
      )}
    </div>
  )
}
