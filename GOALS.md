# Development goals
Status reflects implementation, not assumed browser verification.

## 1. Foundation
- [x] Create dedicated project folder under FUN PROJECTS.
- [x] Document premise, assumptions, rules, characters and visual direction.
- [x] Choose a static stack and avoid unnecessary installations.
- [x] Provide standalone playable design and README caption.
- [x] Add a local preview launcher with live refresh.

## 2. First playable prototype
- [x] Render six individually named and selectable graves.
- [x] Implement five-step excavation with progress and narrative feedback.
- [x] Reveal a cartoon skeleton and collectible letter.
- [x] Mark completed graves and prevent duplicate collection.
- [x] Provide journal buttons for every recovered letter.
- [x] Unlock a final gift message after all six discoveries.
- [x] Persist valid collected IDs locally and handle storage failures.
- [x] Implement confirmed restart.
- [x] Add responsive layouts, keyboard controls and reduced-motion styling.

## 3. Playtest and polish
- [ ] Browser playthrough: collect all six in different orders; verify completion only after six distinct collections.
- [ ] Reload after two discoveries; verify two remain collected.
- [ ] Close a half-dug grave; verify reopening begins at zero and collected graves remain intact.
- [ ] Verify reset cancel preserves progress and reset confirmation clears it.
- [ ] Test malformed storage, blocked storage and private browsing.
- [ ] Keyboard-only playthrough: focus visible, dialog focus contained and restored, Escape works.
- [ ] Test 360px mobile and desktop; no overflow, controls readable and tappable.
- [ ] Replace prototype emoji with original skeleton illustrations if the style is approved.
- [ ] Add opt-in audio with mute and accessible silent play.
- [ ] Ask recipient preferences through the creator; tune horror and humor.

## 4. Personal gift
- [ ] Choose her display name and title dedication.
- [ ] Replace final message with a personal note or shared memory.
- [ ] Consider six small inside jokes as optional letter customizations.
- [ ] Creator reviews the complete experience before sharing.

## 5. Deploy and deliver
- [x] Add Netlify static publish configuration.
- [ ] Connect an authorized Netlify account or deploy dist manually.
- [ ] Verify the returned HTTPS URL on desktop and phone.
- [ ] Verify asset loading and fresh-browser progress behavior in production.
- [ ] Add the actual deployed URL to README.
- [ ] Share the URL with the recipient when the creator is ready.

## 6. Optional expansion
- [ ] Prototype soil-cell digging and compare fun against the tapping version.
- [ ] Add unique coffin and resident art for every grave.
- [ ] Add a second cemetery chapter only after first-session feedback.

## 7. Requested 3D sandbox — current focus
- [x] Preserve existing PlayCanvas starter with checkpoint and separate scene.
- [x] Create original primitive cemetery, headstones, trees, lanterns and characters.
- [x] Implement keyboard movement and randomized wandering NPCs.
- [x] Implement nearby attack with cooldown and non-graphic fall.
- [x] Implement one-body dragging, slower movement and drop.
- [x] Implement three-step grave digging, burial and repeatable exhumation.
- [x] Retain old-resident excavation and two love letters.
- [x] Add HUD, contextual prompts, pause, reset and touch-control buttons.
- [x] Save source locally and upload script to PlayCanvas.
- [x] Validate live standalone state transitions and console; save screenshot artifact.
- [ ] Resolve Editor popup blocking and validate its own Launch runtime.
- [ ] Make scenery editable in the Editor hierarchy rather than runtime-generated.
- [ ] Complete human-input desktop playthrough and real-phone touch test.
- [ ] Add internal obstacle collision and prevent NPCs crossing headstones.
- [ ] Add animated shovel swings, skeletal characters and better body dragging.
- [ ] Add sandbox save/load, pause-menu focus handling and polished letter journal.
- [ ] Pin/vendor PlayCanvas engine for reproducible standalone hosting.
- [ ] Deploy and verify a shareable URL after the chosen prototype is ready.

## 8. Lagos market redesign — implemented
- [x] Confirm Lagos direction and research references with source/provenance notes.
- [x] Preserve previous source and a PlayCanvas recovery checkpoint.
- [x] Build stalls, shops, fabrics, produce, umbrellas, signs and yellow minibus.
- [x] Separate excavation yard from the trading lane.
- [x] Replace capsule characters with articulated humanoids and varied appearance.
- [x] Add procedural walking, swing, stagger, fall and fleeing behavior.
- [x] Add blood particles, pools/trails and a blood visibility toggle.
- [x] Replace instant dragging with slower pull/turn motion and limb poses.
- [x] Replace tap digging with held excavation, soil clods, pit depth and spoil piles.
- [x] Animate burial and correctly restore bodies when cancelled.
- [x] Add stall and open-pit collision, follow camera, zoom and overview.
- [x] Run 19 gameplay-state checks, console checks and mobile layout inspection.
- [x] Save desktop/mobile/overview screenshots as standalone artifacts.
- [ ] Human playtest targeting, pursuit, dragging through corners and touch holding.
- [ ] Add full ragdoll constraints and inverse-kinematics grip if pursuing greater realism.
- [ ] Replace procedural meshes with approved licensed skinned characters if desired.
- [ ] Fix remaining corner interpenetration and add robust NPC navigation.
- [ ] Verify Editor Launch after popup restriction is resolved.

## 9. Seven-note playtest revision — 0.4
- [x] Align both hands with the shovel; add ankle grip while dragging.
- [x] Allow movement during attacks; add sprint/stamina and catchable fleeing speeds.
- [x] Add user-unlocked sound, volume/mute, footsteps, combat/digging sounds, traffic ambience and optional speech.
- [x] Expand world with company buildings, road, roadside shops, traffic and distant cemetery.
- [x] Add player/direction/objective map markers and expandable map.
- [x] Implement explicit dig/lower/refill/climb actions and cancellation recovery.
- [x] Replace proximity-only damage with swept blade hit tests and obstacle rejection.
- [x] Add NPC routines, paired dialogue, trading props and pathfinding.
- [x] Write and implement a four-stage story with an ending and fallback clues.
- [x] Vendor the engine with license; serve the local game successfully.
- [x] Pass 35 live regression checks plus pursuit, obstacle-hit and drag-grip checks.
- [x] Save visual artifacts and update README captions.
- [x] Reconnect a fully loaded PlayCanvas Editor and synchronize the latest source.
- [x] Verify the latest runtime initializes inside Editor Launch; full gameplay regression on its newer engine remains pending.
- [ ] Conduct human listening and physical-phone playtests.
- [ ] Improve actor art, constrained skeletal IK/ragdolls, facial animation and recorded dialogue.
- [ ] Add story saves, more varied routines and robust corner/body collision.

## 10. Gift demo launch — 0.5
- [x] Verify GitHub, Supabase and Vercel account access.
- [x] Add static/dynamic rendering batches and mobile quality limits.
- [x] Reduce pathfinding work and stagger initial NPC routines.
- [x] Add portrait and landscape touch layouts.
- [x] Add objective arrow, distance and red map markers.
- [x] Add original tension music, gesture unlock and volume/mute controls.
- [x] Build envelope opening and personal appreciation letter.
- [x] Add persistent reward count and keepsake gallery with explicit missing-photo state.
- [x] Add six residents across offices and roadside shops.
- [x] Pass 35 gameplay checks and inspect mobile layouts.
- [ ] Receive personal photos and populate the gallery.
- [x] Push source and publish the tested public Vercel demo.
- [x] Verify public URL and all runtime files over unauthenticated HTTPS.
- [ ] Complete browser navigation on the public domain (automation browsers timed out).
- [ ] Physical-phone performance, touch and listening playtest.
- [ ] Synchronize demo additions to the PlayCanvas Editor.
