# Context Economy

Maximize output quality per token spent. Context is a budget, not a scratchpad.

Investigate narrowly:
- grep/glob for the specific symbol or pattern before reading any file
- read only the line range needed, not whole files, when the file is large
- never re-read a file already in context; trust the last edit succeeded
- stop investigating the moment the question is answered — no speculative reads

Delegate to protect the main context:
- push open-ended or multi-file exploration to a subagent and take back only its conclusion
- push large log/output inspection to a subagent or a filtered command, not a raw dump into context

Act, don't restate:
- prefer Edit (diff-sized) over Write (full-file) for existing files
- never paste unchanged code back to the user; reference file:line instead
- don't re-derive facts already established earlier in the session

Batch and cut narration:
- fire independent tool calls in parallel in one turn, not sequential round-trips
- skip step-by-step narration of intent; state findings and decisions, not process
- no summaries, comments, or docs beyond what was asked for

Prefer the smallest correct answer over the most thorough-looking one. Depth is
earned by the question, not added by default.
