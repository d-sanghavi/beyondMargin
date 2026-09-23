import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge, Card } from '../shared/ui'
import { ScreenHeader } from '../shared/Screen'
import { IconCheck, IconPhone } from '../shared/icons'
import { SMS_CARD } from '../mock/extras'
import { useToast } from '../shared/toast'

type Grade = 'A' | 'B' | 'C'

export default function BharatMode() {
  const navigate = useNavigate()
  const [grade, setGrade] = useState<Grade>('C')

  return (
    <div className="flex h-full flex-col bg-appbg">
      <ScreenHeader title="Bharat Mode" onBack={() => navigate(-1)} />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Card className="bg-info p-4">
          <Badge tone="info">T2 · triple-channel delivery</Badge>
          <p className="mt-2 text-sm text-navy">The same verdict reaches a smartphone, a feature phone, or plain SMS — no decision-relevant content is lost.</p>
        </Card>

        {/* Grade switch */}
        <div className="mt-4 flex rounded-btn border border-rule bg-white p-1 text-sm">
          {(['A', 'B', 'C'] as Grade[]).map((g) => (
            <button key={g} onClick={() => setGrade(g)} className={`flex-1 rounded-[9px] py-2 text-xs font-semibold ${grade === g ? 'bg-navy text-white' : 'text-muted'}`}>
              {g === 'A' ? 'Grade A · PWA' : g === 'B' ? 'Grade B · IVR' : 'Grade C · SMS'}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {grade === 'A' && <GradeA />}
          {grade === 'B' && <GradeB />}
          {grade === 'C' && <GradeC />}
        </div>
      </div>
    </div>
  )
}

function GradeA() {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F3EC] text-success"><IconCheck size={18} strokeWidth={3} /></span>
        <div><div className="font-semibold text-ink">Available offline</div><div className="text-xs text-muted">Last report + scheme rulebook cached on device</div></div>
      </div>
      <div className="rounded-lg border border-rule p-3 text-sm">
        <div className="flex items-center justify-between"><span className="text-muted">Chikhli · Dairy</span><Badge tone="success">Viable 74</Badge></div>
        <div className="mt-2 text-xs text-muted">Opens instantly with no network. New requests queue and send when a signal returns.</div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-danger" /> Offline (simulated) — content still fully readable
      </div>
    </Card>
  )
}

function GradeB() {
  const toast = useToast((s) => s.show)
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2 text-navy"><IconPhone size={20} /><span className="font-semibold">IVR callback</span></div>
      <div className="rounded-lg bg-navy p-3 text-sm text-white/90">
        “Your dairy in Chikhli is likely viable, score seventy-four. Press 1 for finance, 2 for risks, 3 to speak to an officer.”
      </div>
      <div className="mx-auto mt-4 grid max-w-[220px] grid-cols-3 gap-2">
        {keys.map((k) => (
          <button key={k} onClick={() => toast(`Pressed ${k} — reading section aloud (demo)`)} className="grid h-12 place-items-center rounded-lg border border-rule bg-white text-lg font-semibold text-navy hover:bg-info">
            {k}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-muted">Read aloud via Bhashini TTS in the selected language, navigable by keypad.</p>
    </Card>
  )
}

function GradeC() {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base">4-SMS Feasibility Card</h3>
        <Badge tone="muted">160-char fixed-field</Badge>
      </div>
      <div className="flex flex-col gap-2">
        {SMS_CARD.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="max-w-[88%] self-start rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-ink shadow-soft"
          >
            {s}
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">Lossless in decision-relevant content — an officer's desktop tool can reconstruct the full record from the SMS text alone.</p>
    </div>
  )
}
