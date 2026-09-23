import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Modal } from '../shared/ui'
import { IconRefresh } from '../shared/icons'
import { BANK_ACCOUNTS, inr } from '../mock/data'
import { delay } from '../shared/hooks'
import { useToast } from '../shared/toast'

export default function LinkedAccounts() {
  const navigate = useNavigate()
  const toast = useToast((s) => s.show)
  const [balances, setBalances] = useState(BANK_ACCOUNTS.map((a) => a.balance))
  const [refreshing, setRefreshing] = useState<number | null>(null)
  const [unlinkIdx, setUnlinkIdx] = useState<number | null>(null)
  const [hidden, setHidden] = useState<number[]>([])

  const refresh = async (i: number) => {
    setRefreshing(i)
    await delay(900)
    setBalances((b) => {
      const next = [...b]
      next[i] = Math.max(1000, Math.round(next[i] * (0.96 + Math.random() * 0.1)))
      return next
    })
    setRefreshing(null)
    toast('Balance updated')
  }

  return (
    <div className="flex h-full flex-col bg-appbg">
      <div className="flex items-center gap-2 px-3 py-3 lg:pt-6 border-b border-rule/70">
        <button onClick={() => navigate(-1)} className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-info">←</button>
        <h2 className="text-lg">Linked accounts</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-3">
          {BANK_ACCOUNTS.map((a, i) =>
            hidden.includes(i) ? null : (
              <Card key={a.id} className="flex items-center gap-3 overflow-hidden p-4">
                <div className="h-12 w-1.5 rounded-full" style={{ background: a.color }} />
                <div className="grid h-10 w-10 place-items-center rounded-full text-white font-bold" style={{ background: a.color }}>
                  {a.short}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-ink">{a.bank}</div>
                  <div className="text-xs text-muted">{a.type} · {a.masked}</div>
                  <div className="num mt-1 text-navy">{inr(balances[i])}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => refresh(i)} aria-label="Refresh" className="text-muted hover:text-navy">
                    <IconRefresh size={18} className={refreshing === i ? 'animate-spin' : ''} />
                  </button>
                  <button onClick={() => setUnlinkIdx(i)} className="text-xs font-semibold text-danger">Unlink</button>
                </div>
              </Card>
            ),
          )}
        </div>

        <Button variant="secondary" full className="mt-5">
          + Link another PAN
        </Button>
        <p className="mt-3 text-center text-xs text-muted">For households with more than one account holder.</p>
      </div>

      <Modal open={unlinkIdx !== null} onClose={() => setUnlinkIdx(null)} title="Unlink this account?">
        <p className="text-sm text-muted">This account will no longer be available for disbursement.</p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" full onClick={() => setUnlinkIdx(null)}>Cancel</Button>
          <Button
            full
            onClick={() => {
              if (unlinkIdx !== null) setHidden((h) => [...h, unlinkIdx])
              setUnlinkIdx(null)
            }}
          >
            Unlink
          </Button>
        </div>
      </Modal>
    </div>
  )
}
