# Git Workflow

## Branch Strategy

**Default branch:** `main`

### Rules
1. **Docs-only packs** (A, B, D, E, F, G): Commit directly to `main`
2. **Code packs** (C): Use feature branches, then merge to `main`

### Branch Naming
```
feature/pack-c-[feature-name]
fix/pack-c-[issue]
```

Examples:
- `feature/pack-c-home-page`
- `feature/pack-c-cart`
- `fix/pack-c-mobile-nav`

---

## Commit Message Convention

```
type: short description

[optional body]
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `chore:` Maintenance, config, scaffolding
- `style:` Formatting, no code change
- `refactor:` Code change that neither fixes bug nor adds feature
- `test:` Adding tests

### Examples
```
docs: add brand voice guide
feat: implement product detail page
fix: cart quantity not updating
chore: update .env.example with new vars
```

---

## Sync Ritual

### Start of Work Session
```bash
# 1. Fetch latest
git fetch origin

# 2. Rebase onto main
git checkout main
git pull --rebase origin main

# 3. If on feature branch
git checkout feature/your-branch
git rebase main
```

### End of Work Session
```bash
# 1. Stage changes
git add .

# 2. Commit with message
git commit -m "type: description"

# 3. Push
git push origin main
# OR for feature branch
git push origin feature/your-branch
```

### Before Merging Feature Branch
```bash
# 1. Update main
git checkout main
git pull --rebase origin main

# 2. Rebase feature branch
git checkout feature/your-branch
git rebase main

# 3. Merge to main
git checkout main
git merge feature/your-branch

# 4. Push
git push origin main

# 5. Delete feature branch
git branch -d feature/your-branch
git push origin --delete feature/your-branch
```

---

## Conflict Prevention

### File Ownership
Each pack has **exclusive ownership** of specific files/folders:

| Pack | Owns |
|------|------|
| A | `/docs/brand/` |
| B | `/docs/shopify/` |
| C | `/storefront/` (all code) |
| D | `/catalog/`, `/docs/catalog/` |
| E | `/docs/printful/` |
| F | `/docs/qa/` |
| G | `/docs/seo/`, `/docs/analytics/` |

### Shared Files
These files may be touched by multiple packs (coordinate!):
- `README.md` — Chrix only
- `/docs/00_PROJECT_OVERVIEW.md` — Chrix only
- `/docs/02_BACKLOG.md` — Any pack can update their section
- `/.env.example` — Pack C primary, others propose changes

---

## Emergency Procedures

### If Push Fails
```bash
# Check what's different
git fetch origin
git log main..origin/main

# Rebase and retry
git pull --rebase origin main
git push origin main
```

### If Merge Conflict
1. **Stop** — Don't force anything
2. Identify which pack owns the conflicting file
3. Coordinate with that pack or Chrix
4. Resolve conflict preserving both changes when possible
5. Test before pushing

### If You Broke Main
```bash
# Find last good commit
git log --oneline

# Revert the bad commit
git revert [bad-commit-hash]
git push origin main
```

---

## Agent Checklist

Before starting any task:
- [ ] `git pull --rebase origin main`
- [ ] Confirm I'm only touching files my pack owns
- [ ] Check if any pack is currently working (coordinate)

After completing any task:
- [ ] `git status` — review changes
- [ ] `git add .`
- [ ] `git commit -m "type: description"`
- [ ] `git push origin main`
- [ ] Update AGENT_HANDOFF if pack complete
