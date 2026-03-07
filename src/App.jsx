import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   LOGO DATA (base64 PNGs embedded)
───────────────────────────────────────────── */
const ICON_B64 = "iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAVtElEQVR42r2ce7AkVX3HP7/TPXPnvu9dlmVBwYgYQeWhImhUiIpKUYUi+ECMmsTEB5oyiMagSUC0FAohWqAkvoiPxBKUIIqhNClKMJQmiIiCmjImLO6yC8vufc2dO3em+5c/eqb79OnT3TMrlana2rkzPd3n/M7v+f3+zpF4c79S8hKR3N+qioigWvqT7LeDS1TIfqMwvKMKI7/sZ+beD59hBBjcf8TxufcqnYMMxqqZPOzfGFdItuBUNffP/bFPyOnAJBNS+hsBZTzBARArPnmnz1DNhDnC+FyFKJ3/cLzWve2FBDBlghtFI8uuVbVUrXATZ4W1qLW5+6SD9zxPKXzv3ldVqVL20vHXvIbXGPti+70trDrBeoU8oqqJR3Du9yqULoi4b7SwToWhVGnlyPNzTbjM31UJttQslPRflX8ZmqBK9rf7u0pfKZ7v7Xs6cxORx0x4w/dhlVMd1RlnqpIJwhtQnEnbgSb1l+IXdNln9j0Kf8eJKynz33WL68rElY2IZCZsO0ifcIar5zpR105cLbI1zWeGWuL/qjQw/WwQrLyBhbwWWloylhbWBSUzvGmVg5G4KODa1bQnQYVwpDyI+D4XOz4NF19KJuhJU2Q4jzqfOoLPVNWBDywThtb7AW9krvnA+xvxTUYy4WnxflIWuR0Be8dSMjf1jKUsHhTSmJxghmYoMkhU/YHGNWnRRKG1woeVaW9BiKpe81cr0A9dRpU/E88zsvkVx1WXrtmKE/rNRcEIiuayA9/EC35RHGcraXzJhBJrQQWG1wjJc3P+kcxK1CvswUNECu6oLIqrNTFXuyorrsHnqQBdyabCiHWgSTpyeSUKmJLVi2IkMNBsIjSHBuj1P36nIDW+KgZ66GYX4hiMKfftYybT9vzSxR0IMSz4JWsWWiE4b2j3+Z0oQhoNaM6jukF3x076D+4k3rcE/aigd6kmar4GLS5kprPaCDCLizSOOIzm4YdhmIS4Tby5iQTBAeV73oDpcUVhWVGtFbVx6QMl779QRVrz9Ff2sXzzzbRv/DabP/4Z8b590EuEFw8FqB5Nk4Foc7V0IuyBr0j+MiBBQHDQIs0Tns7UK17G3MtfSmPLIWh3OTVtsczPB064SXdhroOAa8tDtLekXqHo6KhJ7mEiSDQwocYUS9+4hf1XfIrej36CHLyViWefQPO4Ywi2b0MCkyyKlUml6yDWe9sfuiXb4O/o4Ufp3vtzNv/jx8QP7aFx7DHMvfttbDn3lUhvA+IYDUx5xjEiJlAQ+GMhQDdyIgaVkD2XXsnqJz6DWVxg9k9fz+xrXk7ryb+DoeX1a7/tS9mk+78PsnrDN1n+9JeI9zzCzFv/gEM+/H6CAOKon5i067sdgY0FicW9JRU7IdUDw86GgQeEOGiy691/TefTX6bxouex9fKLmTn2OKAD3S4axwU/ocaT08kgiTd5lMV3LYAYgYkJYIr2L+9n7/s+xOatt9F606s47OrLMMTpD39b3DBL23pLqmnEHQ/QLLyiGGnNsfuyK1m55ComzzmD7ddeQWNuDu2sgDGImMxk1QlW1gIW8kfNshWtCtCqaBRhJmfpt9fZ9fb3snH9N5m96J1sv/gi6Cbj+K3mmbPUEhMe23yiCNOaY+X2O9h99p/QOOHpPP7rn6MxO4V2OxCGo+IRtQj3SK9+hEy06K112PnqN7P5n/ey/Wt/z9yLXki8sXJA0dknWFNrlr5i3C2hNImCUbfDvsuvQRohW6/4AI35BeLNDhKEpbWtC4K6ICtSpAfKhJv7bRig3Q6NuXkOuuz9MNFk/8f+jqi7PrLwfGVrPoC4kP4oiecgatqaoHGENGZYvf3f2fzeD5h+46uYfcaJg5UO82WVY5rpYhjxozaaR1gKpSaSwxOHibwoEIZoZ5nZZ5zIzBvPoXvHD2nfcSfSmIUo8qYurrDcFM6Wl0pJLewrpKsgIBnMuH3TrdBqsfC6s0B76YLY8JJ6IH2VanQnN+jhZNJ7OYjM8D5m+GwD2mf+dWfBxARrN38nS949WuXmu7ZP9OWMYQHqKRPiUFBSRDykERKtPUr3B3fTPP4YJp/2FOhvIMYkmmEkidDDkjaNwpqrbTPtTLxh5hPziFEKIOQSRoHA5FCVJDIb6HeYfOrv0nz6U9j4wd1E7f0ErYksGxgBdbEVyf4uVwtTA22pz3mpQtCgt2sH/d/sZuYFJyGNaXRjGYa+RjNIWuIYWlNAw1v/ihNWZUTMDvpodz1xBbaWDAKKmZyjeezRtL9+C72HHiY46kjodxAT5MrEMmygTKhhUdMkhZF86IWNlmRZhCFeWUW7Xcwh2xKUTD1wgAi0Jlm75176//1A5YrnB2/pon29gGjiAxtPOoKZE46HzY2i2wAMhmD7NnR9g2hlBTAO5nNgrzDnX1QT4VgmoiMl04JGEaKKGZgR6kZHRcMJ9nzoKlavvg5dW7N0zaql1aNqmhmHiHU9GdBgZqaZe+/5bHvPO2BzHcQ49xHUGDSKoNO1PHcNwlRTpYQjg5sMSBob6tcijWgrTYquRDEyOcPq925n+apP03rWcUy/+uWYQIoJoPe9g9LauI0Y4s2I9vU3sXzZNUy/4CRmnnMScbed+uAcd5z6R6GIf4zPEYe+yFIdEf1cgw/fSwWgCoRs3ns/bHSZP/9NLJz9qqS0I6ScTxDnZr6kIQIahEdsZ/er30L3J/cx85zn5Xy5WMBDXaLmwnU+bcwJsC59cNHlApmTwutaTabEMcYEIEKwZb76Wq8ge+h62xpXIpA4ipDJOWi1wAReDsUmtsatulwX58omLCPGy3IzsZJbe5KCWo0k4lQcCiak1+5gpiZZ++736e98BDY7ia+SvFXmsCoFFSF84hHMPP9kTBRBHGVJL0kVRBynvLOPc5Yykqkk763qBbI1NBzZ/5Enx1Mhp5FZcmnOUDslimFqjr3XXcfqtV/ANEJWr/k8q93N1B/5amCxIreiyESLqfNeyaFXfZBAgThCRVCNk9RIFRmAuLbW5co7p/6UMSD+MrIpZESf4OaKKkVTseOaDBPmiSnWf/pT9n3gMsLHb2fuLW8gnJsZenRb0Vw1zCJ8H1ZuuIn1z3+FvUc9gUMu+HOgk9CeRMAE0poYxJQgS9QLXkKKRNSIYIXNh+SDSBqZtHY1CgGnTD3tqC1N2rfeBksrLF57GYuveCXQY4Qq0rppyNRpz+c3Z5zH6uWfwkw0mX3h8yHuo7EirWl6D/wGM9Eg2uyBCRNt0arEm2IUloogKkW0WpQ8qVTnYAvfF0BlbyFIb+8+ZHKCySceDtE68UYbAlNAZaQkfGgUMbFtG9uu/gh73vpe9l94KUuzM6m2KooxhqA1wfInPkfUXufgC9+Oifojg96FXsYyPt75PkwLcqd9og53s1mzLNstJr9JYZ9wH3EUJ+VdGGQ5WhU5LhlUxsYqs899NuEtX2T1a9+i/8Aui0kcOnxh866fsHTp39I4/FC2nHduUlKKXV2Xg0++RiWtUGGVAwgidvaff7jkuzmNHbW14HPc51QGLiFJUTbaTB5+GJMXvGvAA7u8cJPOL+9l54tfQ+dfvw/nvXYAdw1Fp5UaOTaBBoQMeIeC5MUfHodlGaW1snWdWPTmsN0sipLIrFW0uc+OB3+udyBez7ezDZ/TaBDOz8HkZEKwa5TcN67k6EstzvuZa8K5sslBd7ViZlmuaCMpkkVTAY1jREJoNtBIMdNTEEwhUyYXRMQtfJ16TtCa7gVJNdBMdhOwNAxBGglkVdI1a1OoBwLtp2mMD3kRT22PL3URRzOH3QJxjJmaprfvEaJdezDTk3R+9FOi5Ta62UkIJo9KaE1FImUaqwqNkGjfMqbZIF5aobd/L43FOeL1tXyhqVAX+kYp9USkWAuXdYpix5qqRsnEVjETU6z+8Mc88vb3Ee/YBWHII+f/ZTFHy1UAGUBqN3yIZNsYsMq4Qoo1WNGg1WLzzrvY8eJzOPiTH2Xu5GcCsad6cvgWb5VVbsKq6jQX+VZHyoFWURt90cwXIcRRn0cvvRJ96GEm33wuMj+fVAxG0srZBZR00LiR1tY51Jk855m6APtOmjzeBOj+/Wx86UYe/ZsrmP7GPxBMTWLUeeKgIMhxNTUuy/0szJEm+AEVYvU7VNuccmxaQLx/ifiBnQTHHs3jLv/gwFvERcboMe5OyAYRsONXD9C/936iffsIprYU5qgDhrFK46oqFJUaNMYLKqlT69r9yu7VChIG0FtHe1lSWyjW1MEPNR/U1Cr3Cm7YvtZCfpicRpuN1KyLQpCx+elcx9hQgCNVIDLGynvKCTUGCYNs9bUkIJVMTfyVLJWgpTEDfzteP7S7KCoVCb7axLqPMC9NasVX46RUYf7Blvn7BiUjJNHO31qPimb+VMt6VnRshXET/3wl4vGBVRRfcbEkl1OJ5ldKR0lcC9VNWYknOVPK0aJphJXCvpQsGy9xT2M0HI0MZ9XuZvSmu/nJSknZliOuFKQR+p2dXV+j0O+jIoVmpIJZSlZm2v97wS2rwhJX1jKmAH28gNcRiN2ErlmjN3nSST2CyL9XtBESLa3mWi58GqlhSLgwB1E/zdkKoEQuXxUnTSrxgCWUeDkHVCHAkRqOVNM0wOdX1CXXxB/lNIqQyXn233gTey+4hGB2Go1iN0kaPNfQX+9w8LUfYfH009HuSkbe5/hnezjlrcsuxmfDugWwtQQXCEe1ddvc0o58lHjQYJNsipECSJCmJ54qJkvSI4KtizSOOYpgoundJjFsNg82+wSL80A0CBI+SExSFEgswUiha6kcac67Ka2nNct2ZqrNMVgViYu+FCoWyWhEqYpygUF768yd8lzmTvm9hOswVgO5WE3oqqgJkgKv10l7YXJmaPtK4+Na8k0kdXn8cCxeFzeMwhkQ4GjIcKe4FDfa+JNNzW/H16zCkUrAUtBuF3EACnXNR0C0V6QbvYCseFJAtUJ3OamUG6e1Gz4BhyWVS1qJSM5jan1K7hbwqdydPSM5WJpUHW1GL73YSG4Nc+ZflWX7Iq9W1RgjhNaK0mTYgjIca+gmvSMnlVbZNURNtCKry3G2bkbvfK8jC8RJ76SGY5HinkUZJZH2kW6Da0xdflfFiWYmrdbOP+cZPpDCSKESqdvqquR3uNv/chimJn2OwzHlhuSCxxXzczsSyhpMQ19HkttO693yb/tNjwdIK4IgcfpEcW7joQJG86YKg0ZMMt8Yo2krrzjdqDn3aO+ciOOkWTQwSKyZawglf8IH+ZaPNJCOoDxpa0fpoROaN8Ss1cFOCzLfJxNN1BjijQ1AMc0GNCeIV9ZQE2Bakwj9AoBfd7iHjP1dghUqgi6vos1GUuEAdDeRRog0G94gUtj3Z6PdzjaLHC9cSt9JucMRK3URIoLFBczMNNGOXUCXcGErE6eezPpnvsLDH/o482efidCjYOOazxUdNKyc7izLjlVR02D5W7fS+/5dtM4+nXDrwUCX/o5dMDNNcPBBQD8NcHU0rrsVLTeFuLdfJXYEWNXq6wEERIQ4itnxknOJ1zc44rbrCWdm6e7aza43vJPenXfD7DQUdhj5Oiq1NhSm0b/A2wxbthRdbRMe/1S2f/lqpp58JP21VXa8+LVIM+QJ3/0qJgisLlcq3VZ5cBZCsZqCvMl0SctvztT7fczkAhOnnMzKxz9L+657mf/9U5nYvo3H3fBZlv7pRqL7/qsy488VpJLrXR2yFxk9mrcDa9KWcz/qCcy//mwmDtkGali/5z76P/8Vc+94E6Y1D50lJAhKt/iPwgnj65EuaphWQtyZGfeZPetlrF37ZVavu565F54K3Q2aC7Ns+7PzSRoh/z9fQcIfd9ZheoGVL9wAQcD0WS8DohTNqTw2xbU4tJClhGU/Gm43KPRM+zQxMOhmm+lnPYvWmafRufFfWP72rSyccSa69ggSbFrbF0bb0pWMQQsQlI89sw/tyT5L9szJzEEs3/ZvdL72LSbPOI3pZ5+IbrbTMtBNoUYFU1P4LD29TT1llDXQ2n6ZOEaaU7Tv/zkPnfEGzMIsh/7zdUwe+SR0fQnCRjFxdj2cZzLeHZxaTOsKn/f7yNQs3Yd2s/OsPyTauZtDb/kiM8cdS9xdT44fqAF43Ub7XMv24IPcVi+bXXP3rBVOu3BfxqDdNtNPO46FS99D/9cPsuePL6Dz6/9BprYiUYz0I4Zba8X5dyAv+7fpeKMYiSJkapGNXbt56M0X0P/ZL1i45EJmjn8m2m3nhJdROVI6t7LzwHSogXWnBpUdteT1H3GMtmZ5+KprWLn4YwRPPpItH7mI+dNPSwJSvwP9fm6XUilJn5JS1qJKBUYZBNCYBAwrt3+PRy/6KL177mP2r97F9ovejWysJQtdc9iPjsMN+w5gFGerwkhY4VCo8SCpbM2w9/NfYumSK9HVNVpnn8H8689h8sTjCOcWEILHmBPu019fpXPPfaz8442sf/Ub0GiwcPGFbH3bHyHdtpdPGXX7bKmZV55g6d0bN3iwyddSOceumhya2Jpn7Z672Xf5J9m49TaIYhpHP4nGsUfTPPxx6PRUHkDQwf6YXBVksy1SADIQkPY6/V0P0/3ZL+jf90vQmNZLTmXxL97B7EknpwdPyHBn5xADRUZIrcrTmWTX6GDDtXtwRNWeOSlBmgvBIYqQ1jRKzOodP6R983fYuPMuogceJF5ro5FmTlcdEoo8XZoulHg6qYMAmZmmccRhTDz3RGbOfCmzpzwHMQ3ijdV0f3AarWv3wkjtcadi+8CxxO+hEiv9RhQnuzWb00BAf32J/q7d9B/dB5u9PCjodCgUHHeZuU1NEW5ZJNy+lXBqIflRdw3VuMCZjKNhZcLMxwFny/+4O5eguqspO9s0Tk47a4QQNJNE9zHzgZrUtv0e2k8AC7GCRe0i19AZldf5zkzwbTQcFbEdyQHHyZ6OmPyWX6MQW6o37LQX69wslcw3p6SQsXzICLvuKw/gcQ/7qfnNSCZcq4VjRrRR1gPPqR32M3znF8CBH698oPcwdac5Vm20q/VNYybK4mVX8PYHVTn3kQ3fNdkxBjvcvW4KIKVzPkJtNPK2jjlJsY7hyvD06FjmW8V3MM6zSoSpFRC/LZth54ZJSXLPYdPujXyHT4x05nLVcSU1hXxp56ji7abVinJTtF6jyuZVtvkwrLP5cc5NrTpx1z0KPuNd69EQFzEXz84CdY7tyzU+iXh4wnFcwoB19ARbw2P4cmtM39nQbq9g2dn64tbg+Gtv0XLUpkw4o57iO+wBV7S0ZjaltJ7W1771eB65o4plBL7Dhaps0xwryouHmsxVN9XmXFjUEkLfVKlwnR+p4nIdKysktSODE+qfgNup6j38u2w/SA1sld/eWxGbfCack36JaYzSkpvjWz1aNQqMJG7Duuc45YLbyOGa1dt2RskJqw7uVoH/A0/gEb0GI95ZAAAAAElFTkSuQmCC";

const TEXT_B64 = "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";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  { code: "C01", label: "Avviso di pagamento", risk: "alto", color: "#E42733" },
  { code: "C02", label: "Sanzione / Multa", risk: "alto", color: "#E42733" },
  { code: "C03", label: "Atto Amministrativo / PA", risk: "medio-alto", color: "#C03040" },
  { code: "C04", label: "Documento Fiscale", risk: "medio", color: "#D06070" },
  { code: "C05", label: "Contratto / Accordo", risk: "medio", color: "#D06070" },
  { code: "C06", label: "Scadenza Ricorrente", risk: "medio", color: "#D06070" },
  { code: "C07", label: "Richiesta di Azione", risk: "medio", color: "#D06070" },
  { code: "C08", label: "Comunicazione Informativa", risk: "basso-medio", color: "#B07080" },
  { code: "C09", label: "Appuntamento / Convocazione", risk: "medio", color: "#D06070" },
  { code: "C10", label: "Ricevuta / Conferma", risk: "basso", color: "#C09098" },
  { code: "C11", label: "Documento Personale", risk: "medio", color: "#D06070" },
  { code: "C12", label: "Lavoro / Cliente / Fornitore", risk: "variabile", color: "#8A3040" },
  { code: "C13", label: "Newsletter / Promo", risk: "basso", color: "#C09098" },
  { code: "C14", label: "Spam / Irrilevante", risk: "nessuno", color: "#D8C0C4" },
];

const MOCK_DOCS = [
  { id: 1, channel: "PEC", from: "Agenzia delle Entrate", subject: "Avviso di accertamento n. 2025/47281", date: "2026-02-24", category: "C02", read: false, urgent: true, amount: "€ 2.450,00", deadline: "2026-03-10", managed: false },
  { id: 2, channel: "EMAIL", from: "Comune di Milano", subject: "Notifica multa ZTL del 12/01/2026", date: "2026-02-22", category: "C02", read: false, urgent: true, amount: "€ 167,00", deadline: "2026-03-24", managed: false },
  { id: 3, channel: "PEC", from: "AdE Riscossione", subject: "Cartella esattoriale n. 0002348 - F24 2024", date: "2026-02-20", category: "C01", read: true, urgent: true, amount: "€ 890,00", deadline: "2026-03-05", managed: false },
  { id: 4, channel: "EMAIL", from: "Ordine dei Commercialisti", subject: "Convocazione assemblea ordinaria – 15 marzo", date: "2026-02-19", category: "C09", read: true, urgent: false, amount: null, deadline: "2026-03-15", managed: true },
  { id: 5, channel: "REM", from: "Tribunale di Milano", subject: "Atto di citazione – Procedimento 2026/1234", date: "2026-02-17", category: "C03", read: false, urgent: true, amount: null, deadline: "2026-03-03", managed: false },
  { id: 6, channel: "EMAIL", from: "Enel Energia", subject: "Fattura n. FE20260202 – Scadenza 05/03/2026", date: "2026-02-16", category: "C01", read: true, urgent: false, amount: "€ 320,40", deadline: "2026-03-05", managed: false },
  { id: 7, channel: "EMAIL", from: "Generali Assicurazioni", subject: "Rinnovo polizza RC Auto – scadenza 28/02/2026", date: "2026-02-15", category: "C06", read: true, urgent: false, amount: "€ 780,00", deadline: "2026-02-28", managed: true },
  { id: 8, channel: "PEC", from: "Camera di Commercio", subject: "Richiesta integrazione documentale pratica 88/2026", date: "2026-02-12", category: "C07", read: false, urgent: false, amount: null, deadline: "2026-03-12", managed: false },
  { id: 9, channel: "EMAIL", from: "Studio Legale Rossi & Associati", subject: "Contratto di consulenza – testo definitivo", date: "2026-02-10", category: "C05", read: true, urgent: false, amount: "€ 4.200,00", deadline: null, managed: true },
  { id: 10, channel: "EMAIL", from: "Amazon Business", subject: "Fattura #IT-2026-0192834", date: "2026-02-09", category: "C04", read: true, urgent: false, amount: "€ 89,99", deadline: null, managed: true },
  { id: 11, channel: "EMAIL", from: "Stripe Payments", subject: "Your February 2026 invoice is available", date: "2026-02-08", category: "C04", read: true, urgent: false, amount: "€ 340,00", deadline: null, managed: true },
  { id: 12, channel: "REM", from: "Inps", subject: "Comunicazione contributi previdenziali – avviso", date: "2026-02-06", category: "C03", read: false, urgent: false, amount: "€ 1.120,00", deadline: "2026-03-20", managed: false },
];

const CONNECTIONS = [
  { id: "gmail", name: "Gmail", icon: "G", connected: true, email: "mario.rossi@gmail.com", lastSync: "2 min fa", color: "#E02834" },
  { id: "outlook", name: "Outlook", icon: "O", connected: false, email: null, lastSync: null, color: "#8A3040" },
  { id: "pec_aruba", name: "PEC Aruba", icon: "P", connected: true, email: "m.rossi@pec.it", lastSync: "5 min fa", color: "#E02834" },
  { id: "pec_legalmail", name: "PEC Legalmail", icon: "L", connected: false, email: null, lastSync: null, color: "#C03040" },
  { id: "rem", name: "REM / QeRDS", icon: "R", connected: false, email: null, lastSync: null, color: "#7A1418" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getRiskColor = (risk) => {
  if (risk === "alto") return "#E02834";
  if (risk === "medio-alto") return "#C03040";
  if (risk === "medio") return "#D06070";
  if (risk === "basso-medio") return "#B07080";
  return "#C09098";
};

const getCategoryInfo = (code, customCats = []) => CATEGORIES.find(c => c.code === code) || customCats.find(c => c.code === code) || CATEGORIES[12];

const channelBadge = {
  PEC:    { color: "#E02834", bg: "rgba(224,40,52,0.12)" },
  EMAIL:  { color: "#7A1418", bg: "rgba(122,20,24,0.10)" },
  REM:    { color: "#4A0C10", bg: "rgba(74,12,16,0.10)" },
  LOCALE: { color: "#4A7C59", bg: "rgba(74,124,89,0.12)" },
};

/* ─────────────────────────────────────────────
   CSS STYLES (injected)
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ── base ── */
    --bg:      #F2E8D4;
    --surface: #FEFAEF;
    --card:    #FFFFFF;
    --card2:   #FDF4EC;
    --border:  rgba(180,60,50,0.13);
    --border2: rgba(180,60,50,0.22);
    /* ── red scale ── */
    --red:       #E02834;
    --red-dark:  #AA1C22;
    --red-mid:   #D05060;
    --red-pale:  #F8DADE;
    --red-deep:  #7A1418;
    --red-soft:  rgba(224,40,52,0.08);
    --red-glow:  rgba(224,40,52,0.22);
    /* ── semantic aliases (all shades of red/cream) ── */
    --teal:       #B04050;
    --teal-soft:  rgba(176,64,80,0.08);
    --amber:      #C83040;
    --amber-soft: rgba(200,48,64,0.10);
    --blue:       #7A1418;
    --blue-soft:  rgba(122,20,24,0.10);
    --green:      #C86870;
    --green-soft: rgba(200,104,112,0.15);
    --purple:     #7A1418;
    /* ── text ── */
    --text:  #1E0406;
    --text2: #7A3540;
    --text3: #BF9098;
    --font: 'Nunito', sans-serif;
    --brand-font: 'Comfortaa', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); font-size: 14px; -webkit-font-smoothing: antialiased; }

  .app { display: flex; height: 100vh; overflow: hidden; }


  /* ── COLLAPSIBLE SIDEBAR ── */
  .sidebar {
    transition: width 0.22s cubic-bezier(0.4,0,0.2,1),
                min-width 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .sidebar.collapsed {
    width: 62px; min-width: 62px;
  }
  .sidebar.collapsed .logo-wordmark,
  .sidebar.collapsed .nav-item-label,
  .sidebar.collapsed .nav-section,
  .sidebar.collapsed .nav-badge,
  .sidebar.collapsed .user-name,
  .sidebar.collapsed .user-plan,
  .sidebar.collapsed .sidebar-footer .user-pill > div:last-child {
    display: none;
  }
  .sidebar.collapsed .sidebar-header {
    justify-content: center; padding: 18px 0 16px;
  }
  .sidebar.collapsed .logo-icon {
    margin: 0;
  }
  .sidebar.collapsed .nav-item {
    justify-content: center; padding: 10px 0; border-left: 3px solid transparent;
  }
  .sidebar.collapsed .nav-item.active { border-left-color: var(--red); }
  .sidebar.collapsed .nav-icon { width: 18px; height: 18px; opacity: 1; }
  .sidebar.collapsed .sidebar-nav { padding: 10px 0; }
  .sidebar.collapsed .sidebar-footer { padding: 10px 0; display:flex; justify-content:center; }
  .sidebar.collapsed .user-pill {
    width: 38px; height: 38px; border-radius: 50%; padding: 0;
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sidebar.collapsed .user-avatar { width: 34px; height: 34px; font-size: 11px; }

  /* collapsed badge — dot indicator */
  .sidebar.collapsed .nav-item { position: relative; }
  .sidebar.collapsed .nav-item.has-badge::after {
    content: ''; position: absolute; top: 7px; right: 8px;
    width: 7px; height: 7px; border-radius: 50%; background: var(--red);
    border: 1.5px solid var(--surface);
  }

  /* toggle button */
  .sidebar-toggle {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; margin-left: auto;
    background: var(--card); border: 1.5px solid var(--border);
    box-shadow: 0 1px 4px rgba(30,4,6,0.10);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text2); transition: all 0.15s;
  }
  .sidebar-toggle:hover { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .sidebar-toggle svg { transition: transform 0.22s; }
  .sidebar.collapsed .sidebar-toggle { display: none; }
  .logo-icon.clickable { cursor: pointer; transition: opacity 0.15s; }
  .logo-icon.clickable:hover { opacity: 0.75; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-width: 240px; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    padding: 0; overflow: hidden; position: relative;
    box-shadow: 2px 0 8px rgba(224,40,52,0.06);
  }
  .sidebar-header {
    padding: 18px 20px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px; background: var(--surface);
  }
  .logo-icon {
    width: 36px; height: 36px; object-fit: contain; border-radius: 8px;
    background: #FEFAEF; padding: 3px; flex-shrink: 0;
  }
  .logo-wordmark {
    font-family: 'Comfortaa', sans-serif; font-weight: 700; font-size: 19px;
    color: var(--red); letter-spacing: -0.5px; line-height: 1; user-select: none;
  }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section { padding: 8px 16px 4px; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; color: var(--text3); text-transform: uppercase; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 16px;
    cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 400;
    transition: all 0.15s; border-radius: 0; position: relative; border-left: 3px solid transparent;
  }
  .nav-item:hover { background: rgba(224,40,52,0.06); color: var(--text); }
  .nav-item.active { color: var(--red); background: var(--red-soft); border-left-color: var(--red); font-weight: 700; }
  .nav-icon { width: 16px; height: 16px; opacity: 0.8; }
  .nav-badge {
    margin-left: auto; background: var(--red); color: white; border-radius: 10px;
    font-size: 10px; font-weight: 800; padding: 1px 6px; min-width: 18px; text-align: center; font-family: var(--brand-font);
  }
  .sidebar-footer { padding: 16px; border-top: 1px solid var(--border); }
  .user-pill {
    display: flex; align-items: center; gap: 10px; padding: 8px 10px;
    background: var(--red-pale); border-radius: 8px; cursor: pointer;
  }
  .user-avatar {
    width: 28px; height: 28px; border-radius: 50%; background: var(--red);
    display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
  }
  .user-name { font-size: 12.5px; font-weight: 500; }
  .user-plan { font-size: 10.5px; color: var(--text3); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    padding: 0 24px; height: 56px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px; background: var(--surface);
    box-shadow: 0 2px 8px rgba(224,40,52,0.06);
  }
  .page-title { font-size: 15px; font-weight: 700; flex: 1; font-family: var(--brand-font); letter-spacing: -0.3px; }
  .search-box {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface); border: 1px solid var(--border2); border-radius: 8px;
    padding: 7px 12px; width: 260px; position: relative;
  }
  .search-box input {
    background: none; border: none; outline: none; color: var(--text);
    font-family: var(--font); font-size: 13px; width: 100%;
  }
  .search-box input::placeholder { color: var(--text3); }
  .search-box.open { border-color: var(--red); box-shadow: 0 0 0 3px rgba(224,40,52,0.10); border-radius: 8px 8px 0 0; }
  .search-dropdown {
    position: absolute; top: 100%; left: -1px; right: -1px;
    background: var(--card); border: 1px solid var(--red);
    border-top: none; border-radius: 0 0 10px 10px;
    box-shadow: 0 8px 28px rgba(20,4,6,0.18);
    z-index: 200; overflow: hidden; max-height: 340px; overflow-y: auto;
  }
  .search-result-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 14px;
    cursor: pointer; border-bottom: 1px solid var(--border); transition: background 0.1s;
  }
  .search-result-item:last-child { border-bottom: none; }
  .search-result-item:hover { background: var(--red-soft); }
  .search-result-subject { font-size: 12.5px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 240px; }
  .search-result-from { font-size: 11px; color: var(--text3); margin-top: 1px; }
  .search-highlight { color: var(--red); background: rgba(224,40,52,0.12); border-radius: 2px; padding: 0 1px; font-weight: 700; }
  .search-empty { padding: 18px 14px; font-size: 12.5px; color: var(--text3); text-align: center; }
  .search-scope-badge { font-size: 10px; font-weight: 700; color: var(--red); background: var(--red-soft); border-radius: 6px; padding: 1px 7px; white-space: nowrap; flex-shrink: 0; }
  .cat-search-wrap {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface); border: 1px solid var(--border2); border-radius: 8px;
    padding: 8px 12px; margin-bottom: 14px; position: relative;
  }
  .cat-search-wrap input {
    background: none; border: none; outline: none; color: var(--text);
    font-family: var(--font); font-size: 13px; width: 100%;
  }
  .cat-search-wrap input::placeholder { color: var(--text3); }
  .cat-search-wrap.open { border-color: var(--red); box-shadow: 0 0 0 3px rgba(224,40,52,0.10); border-radius: 8px 8px 0 0; }
  .cat-search-dropdown {
    position: absolute; top: 100%; left: -1px; right: -1px;
    background: var(--card); border: 1px solid var(--red);
    border-top: none; border-radius: 0 0 10px 10px;
    box-shadow: 0 8px 28px rgba(20,4,6,0.18);
    z-index: 200; overflow: hidden;
  }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 8px; background: var(--surface);
    border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; color: var(--text2); transition: all 0.15s;
  }
  .icon-btn:hover { background: var(--red-pale); color: var(--red); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px; width: 7px; height: 7px;
    background: var(--red); border-radius: 50%; border: 1.5px solid var(--surface);
  }
  .content { flex: 1; overflow-y: auto; padding: 24px; }

  /* CARDS & GRID */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 16px 18px; position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .stat-card.red::before { background: var(--red); }
  .stat-card.amber::before { background: var(--red-mid); }
  .stat-card.teal::before { background: var(--teal); }
  .stat-card.blue::before { background: var(--blue); }
  .stat-label { font-size: 11px; font-weight: 500; color: var(--text3); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
  .stat-value { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
  .stat-sub { font-size: 11.5px; color: var(--text2); }
  .stat-sub span { color: var(--red); font-weight: 600; }

  /* ALERTS */
  .alert-strip {
    background: var(--red-soft); border: 1px solid rgba(228,39,51,0.3); border-radius: 10px;
    padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;
  }
  .alert-dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; flex-shrink: 0; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
  .alert-text { font-size: 13px; font-weight: 500; flex: 1; }
  .alert-cta { font-size: 12px; font-weight: 600; color: var(--red); cursor: pointer; white-space: nowrap; }

  /* TWO-COL */
  .two-col { display: grid; grid-template-columns: 1fr 340px; gap: 16px; }

  /* TABLE / INBOX */
  .doc-table { width: 100%; border-collapse: collapse; }
  .doc-table th {
    text-align: left; font-size: 10.5px; font-weight: 600; color: var(--text3);
    text-transform: uppercase; letter-spacing: 0.8px; padding: 14px 12px 8px; white-space: nowrap;
  }
  .doc-row {
    border-top: 1px solid var(--border); transition: background 0.1s; cursor: pointer;
  }
  .doc-row:hover { background: rgba(224,40,52,0.04); }
  .doc-row.unread td { color: var(--text); }
  .doc-row td { padding: 11px 12px; font-size: 13px; vertical-align: middle; }
  .channel-tag {
    display: inline-flex; align-items: center; font-size: 10px; font-weight: 700;
    padding: 2px 7px; border-radius: 5px; font-family: var(--mono); letter-spacing: 0.5px;
  }
  .urgency-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
  .subject-text { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .doc-from { font-size: 11.5px; color: var(--text2); margin-top: 2px; }
  .date-text { font-size: 12px; color: var(--text2); white-space: nowrap; font-family: var(--mono); }
  .deadline-badge {
    font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px;
    white-space: nowrap; font-family: var(--mono);
  }
  .deadline-badge.red { color: var(--red); background: var(--red-soft); }
  .deadline-badge.amber { color: var(--red-mid); background: var(--amber-soft); }
  .deadline-badge.ok { color: var(--teal); background: rgba(176,64,80,0.10); }

  /* SECTION HEADER */
  .section-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .section-title { font-size: 14px; font-weight: 700; font-family: var(--brand-font); }
  .section-sub { font-size: 12px; color: var(--text3); }
  .view-all { font-size: 12px; color: var(--red); cursor: pointer; font-weight: 500; }

  /* SIDEBAR WIDGET */
  .widget { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 16px; }
  .widget-title { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }

  /* ALERT ITEMS */
  .alert-item {
    padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;
    border-left: 3px solid; transition: background 0.1s;
  }
  .alert-item:hover { background: rgba(255,255,255,0.03); }
  .alert-item-title { font-size: 12.5px; font-weight: 500; margin-bottom: 3px; }
  .alert-item-sub { font-size: 11px; color: var(--text2); }

  /* CATEGORY LIST */
  .cat-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--border); }
  .cat-row:last-child { border-bottom: none; }
  .cat-code { font-size: 10px; font-weight: 700; font-family: var(--mono); background: var(--red-pale); padding: 2px 5px; border-radius: 4px; color: var(--red); width: 32px; text-align: center; }
  .cat-label { font-size: 12.5px; flex: 1; }
  .cat-count { font-size: 11px; color: var(--text2); font-family: var(--mono); }

  /* TABS */
  .tabs { display: flex; gap: 2px; background: var(--card); border-radius: 8px; padding: 3px; margin-bottom: 18px; border: 1px solid var(--border); }
  .tab { flex: 1; padding: 7px 12px; text-align: center; font-size: 12.5px; font-weight: 500; cursor: pointer; border-radius: 6px; color: var(--text2); transition: all 0.15s; }
  .tab.active { background: var(--red); color: #FEFAEF; font-weight: 600; }
  .tab:hover:not(.active) { background: var(--card2); color: var(--text); }

  /* CONNECTION CARDS */
  .conn-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 14px;
  }
  .conn-icon {
    width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center;
    justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0;
  }
  .conn-name { font-size: 14px; font-weight: 600; }
  .conn-email { font-size: 11.5px; color: var(--text2); margin-top: 2px; font-family: var(--mono); }
  .conn-status { display: flex; align-items: center; gap: 5px; font-size: 11.5px; }
  .conn-dot { width: 6px; height: 6px; border-radius: 50%; }
  .conn-btn {
    margin-left: auto; padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 600;
    cursor: pointer; border: 1px solid; transition: all 0.15s; font-family: var(--font); white-space: nowrap;
  }
  .conn-btn.connect { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .conn-btn.connect:hover { background: var(--red-dark); }
  .conn-btn.disconnect { background: transparent; color: var(--text2); border-color: var(--border); }
  .conn-btn.disconnect:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }

  /* ARCHIVE GRID */
  .archive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .archive-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px; cursor: pointer; transition: all 0.15s;
  }
  .archive-card:hover { border-color: var(--red); background: var(--red-soft); }
  .archive-card:hover .cat-delete-btn { opacity: 1 !important; }
  .cat-delete-btn:hover { background: rgba(224,40,52,0.12) !important; border-color: var(--red) !important; color: var(--red) !important; }
  .archive-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .archive-card-count { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .archive-card-label { font-size: 12px; color: var(--text2); line-height: 1.3; }
  .risk-pill { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 5px; }

  /* TIMELINE */
  .timeline-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .timeline-item:last-child { border-bottom: none; }
  .tl-line { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .tl-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
  .tl-bar { width: 1px; flex: 1; background: var(--border); margin-top: 4px; }
  .tl-content { flex: 1; }
  .tl-date { font-size: 10.5px; color: var(--text3); font-family: var(--mono); margin-bottom: 3px; }
  .tl-title { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
  .tl-sub { font-size: 11.5px; color: var(--text2); }

  /* DOC DETAIL DRAWER */
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(30,4,6,0.35); z-index: 100;
    display: flex; justify-content: flex-end;
  }
  .drawer {
    width: 480px; background: var(--surface); border-left: 1px solid var(--border);
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
    animation: slideIn 0.2s ease;
  }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .drawer-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); }
  .drawer-close { font-size: 20px; cursor: pointer; color: var(--text2); float: right; line-height: 1; }
  .drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
  .drawer-section { margin-bottom: 20px; }
  .drawer-section-title { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); margin-bottom: 10px; }
  .info-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 12px; color: var(--text2); }
  .info-val { font-size: 13px; font-weight: 500; text-align: right; max-width: 220px; }
  .big-badge {
    display: inline-flex; align-items: center; gap: 6px; background: var(--red-soft);
    border: 1px solid rgba(228,39,51,0.3); color: var(--red); padding: 8px 14px;
    border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 16px;
  }
  .risk-card { background: var(--red-pale); border-radius: 8px; padding: 14px; margin-top: 8px; }
  .risk-title { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
  .risk-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .primary-btn {
    width: 100%; padding: 11px; background: var(--red); color: #FEFAEF; border: none;
    border-radius: 8px; font-family: var(--font); font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: background 0.15s; margin-bottom: 8px;
  }
  .primary-btn:hover { background: var(--red-dark); }
  .secondary-btn {
    width: 100%; padding: 11px; background: transparent; color: var(--text2);
    border: 1px solid var(--border2); border-radius: 8px; font-family: var(--font);
    font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  }
  .secondary-btn:hover { border-color: var(--text2); color: var(--text); }
  .drawer-footer { padding: 16px 24px; border-top: 1px solid var(--border); }

  /* PROGRESS BAR */
  .progress-bar { background: var(--red-pale); border-radius: 4px; height: 5px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }

  /* AI CHIP */
  .ai-chip {
    display: inline-flex; align-items: center; gap: 5px; background: var(--red-soft);
    border: 1px solid var(--border2); color: var(--red); padding: 4px 10px;
    border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  }
  .ai-dot { width: 5px; height: 5px; background: var(--red); border-radius: 50%; animation: pulse 2s infinite; }

  /* EMPTY STATE */
  .empty { text-align: center; padding: 60px 20px; color: var(--text3); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-text { font-size: 14px; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(224,40,52,0.22); border-radius: 3px; }

  /* ── CALENDAR ── */
  .cal-wrap { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
  .cal-main { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .cal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px 16px; border-bottom: 1px solid var(--border);
  }
  .cal-month-label {
    font-family: var(--brand-font); font-size: 18px; font-weight: 700;
    color: var(--text); letter-spacing: -0.5px;
  }
  .cal-nav-btn {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--surface); cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--text2); transition: all 0.15s;
  }
  .cal-nav-btn:hover { background: var(--red-pale); border-color: var(--red); color: var(--red); }
  .cal-weekdays {
    display: grid; grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--border);
  }
  .cal-weekday {
    text-align: center; padding: 10px 0; font-size: 11px; font-weight: 700;
    color: var(--text3); text-transform: uppercase; letter-spacing: 0.8px;
  }
  .cal-weekday.weekend { color: var(--red); }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
  .cal-cell {
    min-height: 86px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 8px 10px; cursor: pointer; transition: background 0.12s; position: relative;
  }
  .cal-cell:nth-child(7n) { border-right: none; }
  .cal-cell:hover { background: var(--red-soft); }
  .cal-cell.other-month { opacity: 0.35; }
  .cal-cell.today { background: var(--red-pale); }
  .cal-cell.selected { background: var(--red-soft); box-shadow: inset 0 0 0 2px var(--red); }
  .cal-day-num {
    font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 6px;
    width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; transition: all 0.12s;
  }
  .cal-cell.today .cal-day-num {
    background: var(--red); color: #FEFAEF; font-weight: 800;
  }
  .cal-cell.selected .cal-day-num { color: var(--red); }
  .cal-dot-row { display: flex; flex-wrap: wrap; gap: 3px; }
  .cal-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .cal-event-pill {
    font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
    margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 100%; display: block; cursor: pointer;
  }
  .cal-event-pill:hover { opacity: 0.85; }

  /* ── CALENDAR SIDE PANEL ── */
  .cal-side { display: flex; flex-direction: column; gap: 14px; }
  .cal-day-panel {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    overflow: hidden; flex: 1;
  }
  .cal-day-panel-header {
    padding: 16px 18px 14px; border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .cal-day-title {
    font-family: var(--brand-font); font-size: 15px; font-weight: 700; color: var(--text);
  }
  .cal-day-sub { font-size: 11.5px; color: var(--text2); margin-top: 3px; }
  .cal-day-events { padding: 12px; }
  .cal-event-item {
    padding: 10px 12px; border-radius: 9px; margin-bottom: 8px;
    border-left: 3px solid; cursor: pointer; transition: background 0.12s;
    background: var(--surface);
  }
  .cal-event-item:hover { background: var(--red-pale); }
  .cal-event-item:last-child { margin-bottom: 0; }
  .cal-event-from { font-size: 11px; color: var(--text3); margin-bottom: 3px; font-family: var(--mono); }
  .cal-event-subject { font-size: 12.5px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
  .cal-event-meta { display: flex; gap: 8px; align-items: center; }

  /* ── CALENDAR SUMMARY ── */
  .cal-summary-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px;
  }
  .cal-summary-title {
    font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase;
    letter-spacing: 0.8px; margin-bottom: 10px;
  }
  .cal-summary-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 12.5px;
  }
  .cal-summary-row:last-child { border-bottom: none; }
  .cal-today-btn {
    padding: 7px 16px; border-radius: 8px; border: 1px solid var(--red);
    background: transparent; color: var(--red); font-family: var(--brand-font);
    font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  }
  .cal-today-btn:hover { background: var(--red); color: #FEFAEF; }


  /* ── NOTIFICATION PANEL ── */
  .notif-overlay {
    position: fixed; inset: 0; z-index: 200;
  }
  .notif-panel {
    position: fixed; top: 56px; right: 16px; width: 380px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; box-shadow: 0 12px 40px rgba(30,4,6,0.18);
    display: flex; flex-direction: column; overflow: hidden;
    animation: notifSlideIn 0.18s cubic-bezier(0.16,1,0.3,1);
    max-height: calc(100vh - 76px); z-index: 201;
  }
  @keyframes notifSlideIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .notif-header {
    padding: 16px 18px 12px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); flex-shrink: 0;
  }
  .notif-header-left { display: flex; align-items: center; gap: 10px; }
  .notif-header-title {
    font-family: var(--brand-font); font-size: 14px; font-weight: 700; color: var(--text);
  }
  .notif-count-badge {
    background: var(--red); color: #FEFAEF; border-radius: 10px;
    font-size: 10px; font-weight: 800; padding: 1px 7px; font-family: var(--brand-font);
  }
  .notif-close-btn {
    width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border);
    background: transparent; cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--text2); transition: all 0.12s;
  }
  .notif-close-btn:hover { background: var(--red-pale); color: var(--red); border-color: var(--red); }
  .notif-tabs {
    display: flex; border-bottom: 1px solid var(--border);
    background: var(--surface); flex-shrink: 0;
  }
  .notif-tab {
    flex: 1; padding: 9px 12px; text-align: center; font-size: 12px; font-weight: 600;
    cursor: pointer; color: var(--text3); border-bottom: 2px solid transparent;
    transition: all 0.15s; font-family: var(--font);
  }
  .notif-tab.active { color: var(--red); border-bottom-color: var(--red); background: var(--red-soft); }
  .notif-tab:hover:not(.active) { color: var(--text2); background: rgba(224,40,52,0.04); }
  .notif-list { overflow-y: auto; flex: 1; }
  .notif-item {
    padding: 13px 16px; border-bottom: 1px solid var(--border);
    cursor: pointer; transition: background 0.12s; display: flex; gap: 12px; align-items: flex-start;
    position: relative;
  }
  .notif-item:last-child { border-bottom: none; }
  .notif-item:hover { background: var(--red-soft); }
  .notif-item.unread { background: rgba(224,40,52,0.04); }
  .notif-item.unread:hover { background: var(--red-soft); }
  .notif-unread-indicator {
    position: absolute; left: 6px; top: 50%; transform: translateY(-50%);
    width: 5px; height: 5px; border-radius: 50%; background: var(--red);
  }
  .notif-icon-wrap {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .notif-body { flex: 1; min-width: 0; }
  .notif-item-title {
    font-size: 12.5px; font-weight: 600; color: var(--text); margin-bottom: 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .notif-item-sub {
    font-size: 11.5px; color: var(--text2); line-height: 1.4; margin-bottom: 5px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .notif-item-meta {
    display: flex; gap: 8px; align-items: center;
  }
  .notif-time {
    font-size: 10.5px; color: var(--text3); font-family: var(--mono);
  }
  .notif-footer {
    padding: 10px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); flex-shrink: 0;
  }
  .notif-footer-btn {
    font-size: 12px; font-weight: 600; color: var(--red); cursor: pointer;
    background: none; border: none; font-family: var(--font); padding: 0;
  }
  .notif-footer-btn:hover { text-decoration: underline; }
  .notif-empty {
    padding: 44px 20px; text-align: center;
  }
  .notif-empty-icon { font-size: 32px; margin-bottom: 10px; }
  .notif-empty-text { font-size: 13px; color: var(--text3); }
  .notif-separator {
    padding: 6px 16px; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--text3); background: var(--surface);
    border-bottom: 1px solid var(--border);
  }


  /* ── CATEGORY LANDING ── */
  .cat-landing-header {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 22px 24px; margin-bottom: 20px; display: flex; align-items: flex-start;
    justify-content: space-between; gap: 20px;
  }
  .cat-back-btn {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px;
    font-weight: 600; color: var(--text2); cursor: pointer; background: none;
    border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px;
    transition: all 0.15s; font-family: var(--font); white-space: nowrap;
  }
  .cat-back-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .cat-code-big {
    font-size: 11px; font-weight: 800; font-family: var(--mono);
    padding: 3px 9px; border-radius: 6px; margin-bottom: 10px; display: inline-block;
  }
  .cat-title-big {
    font-family: var(--brand-font); font-size: 20px; font-weight: 700;
    color: var(--text); letter-spacing: -0.5px; margin-bottom: 6px;
  }
  .cat-meta-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .cat-stat-pill {
    display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
    font-weight: 600; padding: 5px 11px; border-radius: 8px; border: 1px solid;
  }
  .cat-section-header {
    display: flex; align-items: center; gap: 10px; padding: 13px 18px;
    border-bottom: 1px solid var(--border); position: sticky; top: 0;
    background: var(--surface); z-index: 1;
  }
  .cat-section-label {
    font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;
  }
  .cat-section-count {
    font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
    font-family: var(--mono);
  }
  .cat-section-line { flex: 1; height: 1px; background: var(--border); }
  .cat-doc-row {
    display: flex; align-items: flex-start; gap: 14px; padding: 14px 18px;
    border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.12s;
  }
  .cat-doc-row:last-child { border-bottom: none; }
  .cat-doc-row:hover { background: var(--red-soft); }
  .cat-doc-status {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; margin-top: 2px;
  }
  .cat-doc-body { flex: 1; min-width: 0; }
  .cat-doc-subject {
    font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .cat-doc-from { font-size: 12px; color: var(--text2); margin-bottom: 7px; }
  .cat-doc-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .cat-doc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
  .cat-amount { font-size: 14px; font-weight: 700; font-family: var(--mono); }
  .cat-manage-btn {
    padding: 5px 12px; border-radius: 7px; font-size: 11.5px; font-weight: 700;
    cursor: pointer; border: 1px solid; transition: all 0.15s; font-family: var(--font);
    white-space: nowrap;
  }
  .cat-manage-btn.mark { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .cat-manage-btn.mark:hover { background: var(--red-dark); }
  .cat-manage-btn.unmark { background: transparent; color: var(--text2); border-color: var(--border); }
  .cat-manage-btn.unmark:hover { border-color: var(--red-mid); color: var(--red-mid); background: var(--red-pale); }
  .cat-empty-section {
    padding: 28px; text-align: center; color: var(--text3); font-size: 13px;
  }
  .cat-progress-summary {
    background: var(--red-pale); border-radius: 10px; padding: 10px 16px;
    display: flex; align-items: center; gap: 14px; margin-top: 12px;
  }
  .cat-progress-bar-wrap { flex: 1; }
  .cat-progress-label { font-size: 11px; color: var(--text2); margin-bottom: 5px; font-weight: 500; }


  /* ── URGENT MANAGER ── */
  .urgent-hero {
    background: var(--red); border-radius: 14px; padding: 22px 26px;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    margin-bottom: 20px; box-shadow: 0 6px 24px rgba(224,40,52,0.28);
  }
  .urgent-hero-left {}
  .urgent-hero-label {
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    color: rgba(254,250,239,0.7); margin-bottom: 6px; font-family: var(--mono);
  }
  .urgent-hero-title {
    font-family: var(--brand-font); font-size: 22px; font-weight: 800;
    color: #FEFAEF; letter-spacing: -0.5px; margin-bottom: 4px;
  }
  .urgent-hero-sub { font-size: 12.5px; color: rgba(254,250,239,0.75); }
  .urgent-hero-stats { display: flex; gap: 18px; flex-shrink: 0; }
  .urgent-hero-stat {
    text-align: center; background: rgba(254,250,239,0.13);
    border-radius: 10px; padding: 10px 16px;
  }
  .urgent-hero-stat-value {
    font-family: var(--brand-font); font-size: 24px; font-weight: 800; color: #FEFAEF;
  }
  .urgent-hero-stat-label {
    font-size: 10.5px; color: rgba(254,250,239,0.7); margin-top: 2px;
  }
  .urgent-filter-bar {
    display: flex; gap: 8px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;
  }
  .urgent-filter-btn {
    padding: 7px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--card); color: var(--text2); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.14s; font-family: var(--font);
  }
  .urgent-filter-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .urgent-filter-btn.active { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .urgent-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    margin-bottom: 10px; overflow: hidden; transition: box-shadow 0.15s;
  }
  .urgent-card:hover { box-shadow: 0 4px 18px rgba(224,40,52,0.10); }
  .urgent-card-inner {
    display: flex; align-items: flex-start; gap: 16px; padding: 16px 18px;
  }
  .urgent-priority-bar {
    width: 4px; border-radius: 2px; flex-shrink: 0; align-self: stretch; min-height: 60px;
  }
  .urgent-card-body { flex: 1; min-width: 0; }
  .urgent-card-from {
    font-size: 11px; color: var(--text3); font-family: var(--mono); margin-bottom: 4px;
    display: flex; gap: 8px; align-items: center;
  }
  .urgent-card-subject {
    font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 8px;
    line-height: 1.3;
  }
  .urgent-card-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .urgent-card-right {
    display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0;
  }
  .urgent-amount {
    font-size: 18px; font-weight: 800; font-family: var(--mono); color: var(--red);
  }
  .urgent-days-badge {
    padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 800;
    font-family: var(--mono); text-align: center;
  }
  .urgent-actions { display: flex; gap: 8px; align-items: center; }
  .urgent-action-btn {
    padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: 1px solid; transition: all 0.14s; font-family: var(--font);
  }
  .urgent-action-btn.primary { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .urgent-action-btn.primary:hover { background: var(--red-dark); }
  .urgent-action-btn.secondary { background: transparent; color: var(--text2); border-color: var(--border); }
  .urgent-action-btn.secondary:hover { border-color: var(--red-mid); color: var(--red-mid); background: var(--red-pale); }
  .urgent-managed-banner {
    background: var(--red-soft); border-top: 1px solid var(--border);
    padding: 8px 18px; display: flex; align-items: center; gap: 8px;
    font-size: 11.5px; color: var(--red); font-weight: 600;
  }
  .urgent-back-btn {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px;
    font-weight: 600; color: var(--text2); cursor: pointer; background: none;
    border: 1px solid var(--border); border-radius: 8px; padding: 7px 13px;
    transition: all 0.15s; font-family: var(--font);
  }
  .urgent-back-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .urgent-completed-strip {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px 24px; text-align: center; margin-top: 20px;
  }

  /* FILTER BAR */
  .filter-bar { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .filter-btn {
    padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
    cursor: pointer; border: 1px solid var(--border2); background: transparent;
    color: var(--text2); transition: all 0.12s; font-family: var(--font);
  }
  .filter-btn.active { background: var(--red); border-color: var(--red); color: white; }
  .filter-btn:hover:not(.active) { border-color: var(--red); color: var(--red); background: var(--red-soft); }

  /* TOOLTIP / INFO */
  .info-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
  .info-box-title { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
  .info-box-text { font-size: 12px; color: var(--text2); line-height: 1.6; }

  /* ANIMATION */
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
`;

/* ─────────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────────── */
const Icon = ({ name, size = 14, color = "currentColor" }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    inbox: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M22 12h-6l-2 3H10l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    archive: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    secretary: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><circle cx="9" cy="10" r="1" fill={color}/><circle cx="12" cy="10" r="1" fill={color}/><circle cx="15" cy="10" r="1" fill={color}/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="9 18 15 12 9 6"/></svg>,
    ai: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M12 2a5 5 0 015 5v1h1a3 3 0 013 3v4a3 3 0 01-3 3H6a3 3 0 01-3-3v-4a3 3 0 013-3h1V7a5 5 0 015-5z"/><circle cx="9" cy="13" r="1" fill={color}/><circle cx="15" cy="13" r="1" fill={color}/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  };
  return icons[name] || null;
};

/* ─────────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────────── */
const DeadlineBadge = ({ deadline }) => {
  if (!deadline) return <span style={{ color: "var(--text3)", fontSize: 12 }}>—</span>;
  const d = daysUntil(deadline);
  if (d < 0) return <span className="deadline-badge red">Scaduto</span>;
  if (d <= 7) return <span className="deadline-badge red">{d}gg</span>;
  if (d <= 21) return <span className="deadline-badge amber">{d}gg</span>;
  return <span className="deadline-badge ok">{d}gg</span>;
};

const ChannelTag = ({ channel }) => {
  const s = channelBadge[channel] || { color: "#999", bg: "rgba(153,153,153,0.15)" };
  return <span className="channel-tag" style={{ color: s.color, background: s.bg }}>{channel}</span>;
};

/* ─────────────────────────────────────────────
   DRAWER (doc detail)
───────────────────────────────────────────── */
const DocDrawer = ({ doc, onClose }) => {
  if (!doc) return null;
  const cat = getCategoryInfo(doc.category);
  const d = daysUntil(doc.deadline);
  const isUrgent = d !== null && d <= 7;

  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!doc) return;
    setAiSummary("");
    setSummaryLoading(true);
    const prompt = `Sei un assistente documentale italiano. Basandoti esclusivamente sui metadati seguenti, scrivi 2-3 frasi che identifichino chiaramente di quale documento si tratta: chi lo ha inviato, qual è l'oggetto specifico, e se presente l'importo o la scadenza. Non fare supposizioni su dettagli non presenti. Non aggiungere consigli o valutazioni. Sii preciso e conciso.

Mittente: ${doc.from}
Oggetto: ${doc.subject}
Data: ${doc.date}
Categoria: ${cat.label}
${doc.amount ? `Importo: ${doc.amount}` : ""}
${doc.deadline ? `Scadenza: ${doc.deadline}` : ""}

Rispondi solo con la sintesi, senza prefissi o intestazioni.`;

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }]
      })
    })
    .then(r => r.json())
    .then(data => {
      const text = data.content?.map(b => b.text || "").join("") || "";
      setAiSummary(text.trim());
    })
    .catch(() => setAiSummary(""))
    .finally(() => setSummaryLoading(false));
  }, [doc?.id]);

  return (
    <div className="drawer-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="drawer">
        <div className="drawer-header">
          <span className="drawer-close" onClick={onClose}><Icon name="close" size={18} /></span>
          <div className="ai-chip" style={{ marginBottom: 12 }}>
            <span className="ai-dot" /> Classificato da A-ESP AI
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{doc.subject}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChannelTag channel={doc.channel} />
            <span style={{ fontSize: 12, color: "var(--text2)" }}>{doc.from}</span>
          </div>
        </div>
        <div className="drawer-body">
          {isUrgent && (
            <div className="big-badge">
              <Icon name="warning" size={14} color="var(--red)" />
              URGENTE — {d === 0 ? "scade oggi" : `${d} giorni alla scadenza`}
            </div>
          )}

          <div className="drawer-section">
            <div className="drawer-section-title">Dettagli Documento</div>
            <div className="info-row"><span className="info-key">Mittente</span><span className="info-val">{doc.from}</span></div>
            <div className="info-row"><span className="info-key">Canale</span><span className="info-val"><ChannelTag channel={doc.channel} /></span></div>
            <div className="info-row"><span className="info-key">Data ricezione</span><span className="info-val" style={{ fontFamily: "var(--mono)" }}>{doc.date}</span></div>
            {doc.deadline && <div className="info-row"><span className="info-key">Scadenza</span><span className="info-val"><DeadlineBadge deadline={doc.deadline} /></span></div>}
            {doc.amount && <div className="info-row"><span className="info-key">Importo</span><span className="info-val" style={{ color: "var(--red)", fontFamily: "var(--mono)", fontSize: 15 }}>{doc.amount}</span></div>}
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Classificazione AI</div>
            <div className="risk-card" style={{ borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                
                <span className="risk-pill" style={{ color: cat.color, background: `${cat.color}22` }}>{cat.risk.toUpperCase()}</span>
              </div>
              <div className="risk-title">{cat.label}</div>
              <div className="risk-desc" style={{ marginTop: 6 }}>
                {cat.risk === "alto" && "Questo documento richiede attenzione immediata. Il mancato intervento entro la scadenza può comportare sanzioni, interessi di mora o ulteriori provvedimenti esecutivi."}
                {cat.risk === "medio-alto" && "Comunicazione ufficiale con potenziali conseguenze legali o amministrative se ignorata."}
                {cat.risk === "medio" && "Documento rilevante che richiede un'azione pianificata entro i termini indicati."}
                {(cat.risk === "basso" || cat.risk === "basso-medio") && "Documento informativo o di bassa priorità. Nessuna azione immediata necessaria."}
              </div>
            </div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">AI Summary</div>
            <div style={{ background:"var(--red-soft)", border:"1px solid rgba(224,40,52,0.18)",
              borderRadius:10, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:10 }}>
                <span style={{ fontSize:13 }}>🤖</span>
                <span style={{ fontSize:10.5, fontWeight:700, color:"var(--red)", textTransform:"uppercase", letterSpacing:"0.6px" }}>
                  Sintesi generata da A-ESP AI
                </span>
              </div>
              {summaryLoading && (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ display:"inline-block", width:11, height:11, borderRadius:"50%",
                    border:"2px solid var(--red)", borderTopColor:"transparent",
                    animation:"spin 0.7s linear infinite", flexShrink:0 }} />
                  <span style={{ fontSize:12, color:"var(--text2)", fontStyle:"italic" }}>Analisi del documento in corso…</span>
                </div>
              )}
              {!summaryLoading && aiSummary && (
                <div style={{ fontSize:13, color:"var(--text)", lineHeight:1.7 }}>{aiSummary}</div>
              )}
              {!summaryLoading && !aiSummary && (
                <div style={{ fontSize:12, color:"var(--text3)", fontStyle:"italic" }}>Sintesi non disponibile per questo documento.</div>
              )}
            </div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Contenuto Estratto (Preview)</div>
            <div className="info-box">
              <div className="info-box-text" style={{ fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.7 }}>
                Gentile cliente,<br />
                con la presente La informiamo che ai sensi dell'art. 36-bis del D.P.R. 29/9/1973 n. 600...
                <br /><br />
                <span style={{ color: "var(--text3)" }}>[Contenuto completo disponibile nell'originale — A-ESP non modifica i documenti]</span>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <button className="primary-btn">
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="check" size={14} color="white" /> Segna come gestito
            </span>
          </button>
          <button className="secondary-btn">
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="archive" size={14} /> Archivia documento
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   URGENT MANAGER
───────────────────────────────────────────── */
const UrgentManager = ({ onBack, onDocClick }) => {
  const [docs, setDocs] = useState(
    MOCK_DOCS.filter(d => d.urgent).map(d => ({ ...d }))
  );
  const [filter, setFilter] = useState("all");

  const toggleManaged = (id) =>
    setDocs(prev => prev.map(d => d.id === id ? { ...d, managed: !d.managed } : d));

  const managedDocs = docs.filter(d =>  d.managed);
  const pendingDocs = docs.filter(d => !d.managed);

  const basePool = pendingDocs;
  const filtered = basePool.filter(d => {
    if (filter === "pec") return d.channel === "PEC";
    if (filter === "rem") return d.channel === "REM";
    if (filter === "7gg") return daysUntil(d.deadline) !== null && daysUntil(d.deadline) <= 7;
    return true;
  });

  const totalRisk = docs.reduce((sum, d) => {
    if (!d.amount) return sum;
    const n = parseFloat(d.amount.replace(/[^\d,]/g, "").replace(",", "."));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const urgentCount = pendingDocs.length;
  const days = pendingDocs.map(d => daysUntil(d.deadline)).filter(v => v !== null && v >= 0);
  const daysMin = days.length ? Math.min(...days) : null;

  const priorityColor = (doc) => {
    const d = daysUntil(doc.deadline);
    if (d !== null && d <= 3) return "var(--red)";
    if (d !== null && d <= 7) return "var(--red-mid)";
    return "var(--teal)";
  };

  const UrgentCard = ({ doc }) => {
    const d     = daysUntil(doc.deadline);
    const color = priorityColor(doc);
    const cat   = getCategoryInfo(doc.category);
    return (
      <div className="urgent-card">
        <div className="urgent-card-inner">
          <div className="urgent-priority-bar" style={{ background: color }} />

          <div className="urgent-card-body">
            <div className="urgent-card-from">
              <ChannelTag channel={doc.channel} />
              {doc.from}
              {doc.managed && (
                <span style={{ background:"var(--red-pale)", color:"var(--red-mid)", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:4 }}>
                  gestita
                </span>
              )}
            </div>
            <div
              className="urgent-card-subject"
              style={{ cursor:"pointer", textDecoration: doc.managed ? "line-through" : "none",
                color: doc.managed ? "var(--text3)" : "var(--text)" }}
              onClick={() => onDocClick(doc)}
            >
              {doc.subject}
            </div>
            <div className="urgent-card-meta">
              <span style={{ fontSize:11, fontWeight:600, color:cat.color, background:`${cat.color}18`, padding:"2px 7px", borderRadius:5 }}>
                {cat.label}
              </span>
              <span className="date-text">Ricevuto {doc.date}</span>
              {doc.deadline && <DeadlineBadge deadline={doc.deadline} />}
            </div>
          </div>

          <div className="urgent-card-right">
            {doc.amount && (
              <span className="urgent-amount" style={{ color: doc.managed ? "var(--text3)" : color }}>
                {doc.amount}
              </span>
            )}
            {d !== null && (
              <div className="urgent-days-badge" style={{
                background: doc.managed ? "var(--surface)" : `${color}18`,
                color: doc.managed ? "var(--text3)" : color,
                border: `1px solid ${doc.managed ? "var(--border)" : color + "40"}`,
              }}>
                {d < 0 ? `Scaduto ${Math.abs(d)}gg fa` : d === 0 ? "Scade oggi" : `${d} giorni`}
              </div>
            )}
            <div className="urgent-actions">
              <button className="urgent-action-btn secondary" onClick={() => onDocClick(doc)}>Apri</button>
              <button
                className={`urgent-action-btn ${doc.managed ? "secondary" : "primary"}`}
                onClick={() => toggleManaged(doc.id)}
              >
                {doc.managed ? "Riapri" : "Segna gestita"}
              </button>
            </div>
          </div>
        </div>
        {doc.managed && (
          <div className="urgent-managed-banner">
            <Icon name="check" size={12} color="var(--red)" />
            Pratica marcata come gestita — nessuna ulteriore azione richiesta
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fade-in">
      {/* HERO */}
      <div className="urgent-hero">
        <div className="urgent-hero-left">
          <div className="urgent-hero-label">Modalità gestione urgenti — A-ESP AI</div>
          <div className="urgent-hero-title">
            {urgentCount === 0 ? "Tutto sotto controllo" : `${urgentCount} ${urgentCount === 1 ? "pratica" : "pratiche"} da gestire`}
          </div>
          <div className="urgent-hero-sub">
            {urgentCount === 0
              ? "Hai gestito tutti i documenti urgenti. Ottimo lavoro."
              : `La più critica scade tra ${daysMin !== null ? daysMin : "—"} giorni — gestisci in ordine di priorità`}
          </div>
        </div>
        <div className="urgent-hero-stats">
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{urgentCount}</div>
            <div className="urgent-hero-stat-label">Da gestire</div>
          </div>
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{managedDocs.length}</div>
            <div className="urgent-hero-stat-label">Gestite</div>
          </div>
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{"€" + Math.round(totalRisk).toLocaleString("it-IT")}</div>
            <div className="urgent-hero-stat-label">Rischio totale</div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:12, flexWrap:"wrap" }}>
        <div className="urgent-filter-bar" style={{ marginBottom:0 }}>
          {[
            { key:"all", label:"Tutti" },
            { key:"7gg", label:"Entro 7 giorni" },
            { key:"pec", label:"PEC" },
            { key:"rem", label:"REM" },
          ].map(f => (
            <button key={f.key} className={`urgent-filter-btn${filter === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="urgent-back-btn" onClick={onBack}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Torna alla Dashboard
          </button>
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="urgent-completed-strip">
          <div style={{ fontSize:32, marginBottom:10 }}>{filter !== "all" ? "🔍" : "🎉"}</div>
          <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:6 }}>
            {filter !== "all" ? "Nessun documento per questo filtro" : "Tutti i documenti urgenti sono stati gestiti"}
          </div>
          <div style={{ fontSize:12.5, color:"var(--text2)" }}>
            {filter !== "all" ? "Prova a cambiare il filtro" : "A-ESP continua a monitorare i tuoi canali in tempo reale"}
          </div>
        </div>
      ) : (
        filtered.map(doc => <UrgentCard key={doc.id} doc={doc} />)
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   STAT LANDING PAGES
───────────────────────────────────────────── */

// Mini bar chart
const BarChart = ({ data, color = "var(--red)" }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
          <div style={{ width:"100%", background:`${color}22`, borderRadius:4, height:72, display:"flex", alignItems:"flex-end" }}>
            <div style={{ width:"100%", background:color, borderRadius:4,
              height:`${Math.round((d.value/max)*100)}%`, minHeight:4, transition:"height 0.4s" }} />
          </div>
          <span style={{ fontSize:9.5, color:"var(--text3)", whiteSpace:"nowrap" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// Mini donut
const Donut = ({ segments }) => {
  // segments: [{value, color, label}]
  const total = segments.reduce((s,d) => s + d.value, 0);
  let offset = 0;
  const R = 36, C = 2 * Math.PI * R;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:20 }}>
      <svg width={90} height={90} viewBox="0 0 90 90">
        <circle cx={45} cy={45} r={R} fill="none" stroke="var(--border)" strokeWidth={12} />
        {segments.map((seg, i) => {
          const dash = (seg.value / total) * C;
          const el = (
            <circle key={i} cx={45} cy={45} r={R} fill="none"
              stroke={seg.color} strokeWidth={12}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 45 45)" />
          );
          offset += dash;
          return el;
        })}
        <text x={45} y={49} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)">{total}</text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:10, height:10, borderRadius:3, background:seg.color, flexShrink:0 }} />
            <span style={{ fontSize:11.5, color:"var(--text2)" }}>{seg.label}</span>
            <span style={{ fontSize:11.5, fontWeight:700, color:"var(--text)", marginLeft:"auto", paddingLeft:8 }}>{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatPage = ({ title, color, onBack, children }) => (
  <div className="fade-in">
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
      <button onClick={onBack} style={{ background:"var(--surface)", border:"1px solid var(--border)",
        borderRadius:8, padding:"6px 12px", cursor:"pointer", fontSize:12, fontWeight:600,
        color:"var(--text2)", fontFamily:"var(--font)", display:"flex", alignItems:"center", gap:6 }}>
        ← Torna alla dashboard
      </button>
      <div style={{ fontSize:18, fontWeight:800, color:"var(--text)" }}>{title}</div>
      <div style={{ width:10, height:10, borderRadius:"50%", background:color, marginLeft:2 }} />
    </div>
    {children}
  </div>
);

const StatCard2 = ({ label, value, sub, color }) => (
  <div style={{ background:"var(--card)", border:`1px solid ${color}30`, borderRadius:12,
    padding:"18px 20px", borderTop:`3px solid ${color}` }}>
    <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
      letterSpacing:"0.7px", marginBottom:6 }}>{label}</div>
    <div style={{ fontSize:28, fontWeight:800, color, marginBottom:4 }}>{value}</div>
    {sub && <div style={{ fontSize:11.5, color:"var(--text3)" }}>{sub}</div>}
  </div>
);

// ── NON LETTI ──
const UnreadPage = ({ onBack, onDocClick }) => {
  const unread  = MOCK_DOCS.filter(d => !d.read);
  const urgent  = unread.filter(d => d.urgent);
  const byChannel = ["EMAIL","PEC","REM"].map(ch => ({
    label: ch, value: unread.filter(d => d.channel === ch).length
  }));
  const byCat = {};
  unread.forEach(d => { byCat[d.category] = (byCat[d.category]||0)+1; });
  const catSegs = Object.entries(byCat).map(([code, val]) => {
    const cat = getCategoryInfo(code);
    return { value: val, color: cat.color, label: cat.label };
  });
  const byDay = ["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map((label,i) => ({
    label, value: unread.filter((_,j) => j % 7 === i).length + Math.floor(Math.random()*2)
  }));

  return (
    <StatPage title="Non letti" color="var(--red)" onBack={onBack}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard2 label="Totale non letti" value={unread.length} color="var(--red)" />
        <StatCard2 label="Di cui urgenti" value={urgent.length} sub="Richiedono azione immediata" color="var(--red)" />
        <StatCard2 label="Via PEC / REM" value={unread.filter(d=>d.channel!=="EMAIL").length} sub="Valore legale" color="var(--red)" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Per canale</div>
          <BarChart data={byChannel} color="var(--red)" />
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Per categoria</div>
          <Donut segments={catSegs} />
        </div>
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", fontSize:12, fontWeight:700, color:"var(--text)" }}>
          Documenti non letti
        </div>
        <table className="doc-table" style={{ width:"100%" }}>
          <thead><tr><th style={{paddingLeft:16}}>Canale</th><th>Documento</th><th>Categoria</th><th>Scadenza</th></tr></thead>
          <tbody>
            {unread.map(doc => {
              const cat = getCategoryInfo(doc.category);
              return (
                <tr key={doc.id} className="doc-row unread" onClick={() => onDocClick(doc)}>
                  <td style={{paddingLeft:16}}><div style={{display:"flex",alignItems:"center",gap:6}}><div className="urgency-dot" style={{background:doc.urgent?"var(--red)":"var(--red-mid)"}} /><ChannelTag channel={doc.channel} /></div></td>
                  <td><div className="doc-subject">{doc.subject}</div><div className="doc-from">{doc.from}</div></td>
                  <td><span className="cat-pill" style={{color:cat.color,background:`${cat.color}18`}}>{cat.label}</span></td>
                  <td>{doc.deadline ? <DeadlineBadge deadline={doc.deadline} /> : <span style={{color:"var(--text3)",fontSize:11}}>—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StatPage>
  );
};

// ── IN SCADENZA ──
const DeadlinePage = ({ onBack, onDocClick }) => {
  const expiring = MOCK_DOCS.filter(d => daysUntil(d.deadline) !== null && daysUntil(d.deadline) >= 0 && daysUntil(d.deadline) <= 30);
  const within7  = expiring.filter(d => daysUntil(d.deadline) <= 7);
  const within15 = expiring.filter(d => daysUntil(d.deadline) > 7 && daysUntil(d.deadline) <= 15);
  const within30 = expiring.filter(d => daysUntil(d.deadline) > 15);
  const barData = [
    { label:"0–7 gg", value: within7.length },
    { label:"8–15 gg", value: within15.length },
    { label:"16–30 gg", value: within30.length },
  ];
  const catSegs = Object.entries(
    expiring.reduce((acc,d) => { acc[d.category]=(acc[d.category]||0)+1; return acc; }, {})
  ).map(([code,val]) => { const cat=getCategoryInfo(code); return {value:val,color:cat.color,label:cat.label}; });

  return (
    <StatPage title="In scadenza (30 giorni)" color="var(--amber)" onBack={onBack}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard2 label="Totale in scadenza" value={expiring.length} color="var(--amber)" />
        <StatCard2 label="Entro 7 giorni" value={within7.length} sub="Priorità critica" color="var(--red)" />
        <StatCard2 label="Totale esposto" value={"€ "+expiring.filter(d=>d.amount).reduce((s,d)=>s+parseFloat(d.amount.replace(/[^0-9,]/g,"").replace(",",".")),0).toLocaleString("it-IT",{minimumFractionDigits:2})} sub="Importi con scadenza" color="var(--amber)" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Distribuzione temporale</div>
          <BarChart data={barData} color="var(--amber)" />
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Per categoria</div>
          <Donut segments={catSegs} />
        </div>
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", fontSize:12, fontWeight:700 }}>Documenti in scadenza — ordinati per urgenza</div>
        <table className="doc-table" style={{ width:"100%" }}>
          <thead><tr><th style={{paddingLeft:16}}>Canale</th><th>Documento</th><th>Categoria</th><th>Scadenza</th></tr></thead>
          <tbody>
            {[...expiring].sort((a,b)=>daysUntil(a.deadline)-daysUntil(b.deadline)).map(doc => {
              const cat = getCategoryInfo(doc.category);
              return (
                <tr key={doc.id} className="doc-row" onClick={() => onDocClick(doc)}>
                  <td style={{paddingLeft:16}}><ChannelTag channel={doc.channel} /></td>
                  <td><div className="doc-subject">{doc.subject}</div><div className="doc-from">{doc.from}</div></td>
                  <td><span className="cat-pill" style={{color:cat.color,background:`${cat.color}18`}}>{cat.label}</span></td>
                  <td><DeadlineBadge deadline={doc.deadline} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StatPage>
  );
};

// ── ARCHIVIATI ──
const ArchivedPage = ({ onBack, onDocClick }) => {
  const archived = MOCK_DOCS.filter(d => d.managed);
  const byChannel = ["EMAIL","PEC","REM"].map(ch => ({ label:ch, value:archived.filter(d=>d.channel===ch).length }));
  const byMonth = ["Ott","Nov","Dic","Gen","Feb","Mar"].map((label,i) => ({
    label, value: [3,5,8,4,6,archived.length][i] || 0
  }));
  const catSegs = Object.entries(
    archived.reduce((acc,d) => { acc[d.category]=(acc[d.category]||0)+1; return acc; }, {})
  ).map(([code,val]) => { const cat=getCategoryInfo(code); return {value:val,color:cat.color,label:cat.label}; });

  return (
    <StatPage title="Archiviati" color="var(--teal)" onBack={onBack}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard2 label="Totale archiviati" value={247} sub="+12 questa settimana" color="var(--teal)" />
        <StatCard2 label="Gestiti (mock)" value={archived.length} sub="Nell'insieme corrente" color="var(--teal)" />
        <StatCard2 label="Conservazione" value="10 anni" sub="Obbligo normativo fatture" color="var(--teal)" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Archiviati per mese</div>
          <BarChart data={byMonth} color="var(--teal)" />
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Per categoria</div>
          <Donut segments={catSegs} />
        </div>
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Per canale</div>
        <BarChart data={byChannel} color="var(--teal)" />
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", fontSize:12, fontWeight:700 }}>Documenti gestiti</div>
        <table className="doc-table" style={{ width:"100%" }}>
          <thead><tr><th style={{paddingLeft:16}}>Canale</th><th>Documento</th><th>Categoria</th><th>Scadenza</th></tr></thead>
          <tbody>
            {archived.map(doc => {
              const cat = getCategoryInfo(doc.category);
              return (
                <tr key={doc.id} className="doc-row" onClick={() => onDocClick(doc)}>
                  <td style={{paddingLeft:16}}><ChannelTag channel={doc.channel} /></td>
                  <td><div className="doc-subject">{doc.subject}</div><div className="doc-from">{doc.from}</div></td>
                  <td><span className="cat-pill" style={{color:cat.color,background:`${cat.color}18`}}>{cat.label}</span></td>
                  <td>{doc.deadline ? <DeadlineBadge deadline={doc.deadline} /> : <span style={{color:"var(--text3)",fontSize:11}}>—</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </StatPage>
  );
};

// ── RISCHIO ECONOMICO ──
const RiskPage = ({ onBack, onDocClick }) => {
  const risky = MOCK_DOCS.filter(d => d.amount);
  const total = risky.reduce((s,d) => s + parseFloat(d.amount.replace(/[^0-9,]/g,"").replace(",",".")), 0);
  const high   = risky.filter(d => ["C01","C02"].includes(d.category));
  const medium = risky.filter(d => d.category === "C03");
  const low    = risky.filter(d => !["C01","C02","C03"].includes(d.category));
  const sum = arr => arr.reduce((s,d)=>s+parseFloat(d.amount.replace(/[^0-9,]/g,"").replace(",",".")),0);
  const donutSegs = [
    { value: high.length,   color:"var(--red)",      label:"Alto rischio" },
    { value: medium.length, color:"var(--amber)",    label:"Medio rischio" },
    { value: low.length,    color:"var(--teal)",     label:"Basso rischio" },
  ].filter(s => s.value > 0);
  const barData = [
    { label:"Alto",   value: Math.round(sum(high)) },
    { label:"Medio",  value: Math.round(sum(medium)) },
    { label:"Basso",  value: Math.round(sum(low)) },
  ];

  return (
    <StatPage title="Rischio economico" color="var(--blue)" onBack={onBack}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        <StatCard2 label="Esposizione totale" value={"€ "+total.toLocaleString("it-IT",{minimumFractionDigits:2})} sub="Somma importi con scadenza" color="var(--blue)" />
        <StatCard2 label="Alto rischio" value={high.length+" doc."} sub={"€ "+sum(high).toLocaleString("it-IT",{minimumFractionDigits:2})} color="var(--red)" />
        <StatCard2 label="Sanzioni potenziali" value="fino al 30%" sub="Su importi non pagati >60gg" color="var(--amber)" />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Esposizione per livello (€)</div>
          <BarChart data={barData} color="var(--blue)" />
        </div>
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"18px 20px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:14 }}>Distribuzione documenti</div>
          <Donut segments={donutSegs} />
        </div>
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:"16px 20px", marginBottom:16,
        borderLeft:"3px solid var(--red)" }}>
        <div style={{ fontSize:11, fontWeight:700, color:"var(--red)", textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:10 }}>
          Tabella sanzioni ravvedimento operoso
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:6 }}>
          {[["Entro 14 gg","+0,1%/gg"],["15–30 gg","+1,5%"],["31–90 gg","+1,67%"],["91gg–1 anno","+3,75%"],[">1 anno","+5%"]].map(([label,pct],i) => (
            <div key={i} style={{ background:"var(--surface)", borderRadius:8, padding:"10px 8px", textAlign:"center" }}>
              <div style={{ fontSize:10, color:"var(--text3)", marginBottom:4 }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:800, color:"var(--red)" }}>{pct}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", fontSize:12, fontWeight:700 }}>Documenti con importo — ordinati per rischio</div>
        <table className="doc-table" style={{ width:"100%" }}>
          <thead><tr><th style={{paddingLeft:16}}>Canale</th><th>Documento</th><th>Importo</th><th>Scadenza</th></tr></thead>
          <tbody>
            {[...risky].sort((a,b) => {
              const order = {"C02":0,"C01":1,"C03":2};
              return (order[a.category]??3) - (order[b.category]??3);
            }).map(doc => (
              <tr key={doc.id} className="doc-row" onClick={() => onDocClick(doc)}>
                <td style={{paddingLeft:16}}><ChannelTag channel={doc.channel} /></td>
                <td><div className="doc-subject">{doc.subject}</div><div className="doc-from">{doc.from}</div></td>
                <td><span style={{color:"var(--red)",fontFamily:"var(--mono)",fontWeight:700,fontSize:13}}>{doc.amount}</span></td>
                <td>{doc.deadline ? <DeadlineBadge deadline={doc.deadline} /> : <span style={{color:"var(--text3)",fontSize:11}}>—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StatPage>
  );
};

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────── */
const Dashboard = ({ onDocClick, onNavigate }) => {
  const urgent = MOCK_DOCS.filter(d => d.urgent && !d.managed);
  const totalRisk = MOCK_DOCS.filter(d => ["C01","C02","C03"].includes(d.category));
  const unread = MOCK_DOCS.filter(d => !d.read);
  const [showUrgent,   setShowUrgent]   = useState(false);
  const [statPage,     setStatPage]     = useState(null); // "unread"|"deadline"|"archived"|"risk"

  if (showUrgent) return <UrgentManager onBack={() => setShowUrgent(false)} onDocClick={onDocClick} />;
  if (statPage === "unread")   return <UnreadPage   onBack={() => setStatPage(null)} onDocClick={onDocClick} />;
  if (statPage === "deadline") return <DeadlinePage onBack={() => setStatPage(null)} onDocClick={onDocClick} />;
  if (statPage === "archived") return <ArchivedPage onBack={() => setStatPage(null)} onDocClick={onDocClick} />;
  if (statPage === "risk")     return <RiskPage     onBack={() => setStatPage(null)} onDocClick={onDocClick} />;

  return (
    <div className="fade-in">
      {/* URGENT ALERT */}
      {urgent.length > 0 && (
        <div className="alert-strip" style={{ cursor:"default" }}>
          <div className="alert-dot" />
          <span className="alert-text">
            <strong>{urgent.length} documenti urgenti</strong> richiedono la tua attenzione — il più critico scade tra {Math.min(...urgent.map(d => daysUntil(d.deadline)).filter(Boolean))} giorni
          </span>
          <span className="alert-cta" style={{ cursor:"pointer" }} onClick={() => setShowUrgent(true)}>Gestisci ora →</span>
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card red" style={{ cursor:"pointer" }} onClick={() => setStatPage("unread")}>
          <div className="stat-label">Non letti</div>
          <div className="stat-value" style={{ color: "var(--red)" }}>{unread.length}</div>
          <div className="stat-sub"><span>{urgent.length} urgenti</span> da gestire</div>
        </div>
        <div className="stat-card amber" style={{ cursor:"pointer" }} onClick={() => setStatPage("deadline")}>
          <div className="stat-label">In scadenza (30gg)</div>
          <div className="stat-value" style={{ color: "var(--amber)" }}>
            {MOCK_DOCS.filter(d => daysUntil(d.deadline) !== null && daysUntil(d.deadline) <= 30 && daysUntil(d.deadline) >= 0).length}
          </div>
          <div className="stat-sub">Prossimo: <span>3 giorni</span></div>
        </div>
        <div className="stat-card teal" style={{ cursor:"pointer" }} onClick={() => setStatPage("archived")}>
          <div className="stat-label">Archiviati</div>
          <div className="stat-value" style={{ color: "var(--teal)" }}>247</div>
          <div className="stat-sub">+<span>12</span> questa settimana</div>
        </div>
        <div className="stat-card blue" style={{ cursor:"pointer" }} onClick={() => setStatPage("risk")}>
          <div className="stat-label">Rischio economico</div>
          <div className="stat-value" style={{ color: "var(--blue)" }}>€ 4.827</div>
          <div className="stat-sub"><span>{totalRisk.length} doc.</span> ad alto rischio</div>
        </div>
      </div>

      {/* MAIN TWO COL */}
      <div className="two-col">
        {/* RECENT DOCS */}
        <div>
          <div className="section-hdr">
            <div>
              <div className="section-title">Documenti Recenti</div>
              <div className="section-sub">Ultimi 7 giorni — ordinati per priorità</div>
            </div>
            <div className="ai-chip"><span className="ai-dot" />AI attiva</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 16 }}>Canale</th>
                  <th>Documento</th>
                  <th>Categoria</th>
                  <th>Scadenza</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DOCS.slice(0, 7).map(doc => {
                  const cat = getCategoryInfo(doc.category);
                  return (
                    <tr key={doc.id} className={`doc-row ${!doc.read ? "unread" : ""}`} onClick={() => onDocClick(doc)}>
                      <td style={{ paddingLeft: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {!doc.read && <div className="urgency-dot" style={{ background: doc.urgent ? "var(--red)" : "var(--red-mid)" }} />}
                          <ChannelTag channel={doc.channel} />
                        </div>
                      </td>
                      <td>
                        <div className="subject-text" style={{ fontWeight: !doc.read ? 600 : 400 }}>{doc.subject}</div>
                        <div className="doc-from">{doc.from}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}18`, padding: "2px 7px", borderRadius: 5 }}>{cat.label}</span>
                      </td>
                      <td><DeadlineBadge deadline={doc.deadline} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div>
          {/* URGENT ALERTS */}
          <div className="widget">
            <div className="widget-title">⚠ Azioni Urgenti</div>
            {MOCK_DOCS.filter(d => d.urgent).slice(0, 3).map(doc => {
              const d = daysUntil(doc.deadline);
              const color = d !== null && d <= 7 ? "var(--red)" : "var(--red-mid)";
              return (
                <div key={doc.id} className="alert-item" style={{ borderLeftColor: color, background: `${color}09` }} onClick={() => onDocClick(doc)}>
                  <div className="alert-item-title">{doc.from}</div>
                  <div className="alert-item-sub">{doc.amount ? `${doc.amount} — ` : ""}{d !== null ? `${d}gg alla scadenza` : "Nessuna scadenza"}</div>
                </div>
              );
            })}
          </div>

          {/* CANALI */}
          <div className="widget">
            <div className="widget-title">Canali Attivi</div>
            {CONNECTIONS.filter(c => c.connected).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: c.color }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>{c.email}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--red-mid)" }} />
                  <span style={{ fontSize: 10.5, color: "var(--text3)" }}>{c.lastSync}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text2)", textAlign: "center" }}>
              <span style={{ color: "var(--red)", cursor: "pointer", fontWeight: 600 }} onClick={() => onNavigate("connections")}>+ Aggiungi canale</span>
            </div>
          </div>

          {/* RISCHIO ECONOMICO */}
          <div className="widget">
            <div className="widget-title">Rischio Economico Stimato</div>
            {[["Alto rischio", "€ 3.340", 0.69, "var(--red)"], ["Medio rischio", "€ 1.100", 0.22, "var(--red-mid)"], ["Basso rischio", "€ 387", 0.08, "var(--teal)"]].map(([label, val, pct, color]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--mono)", color }}>{val}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── INBOX ─── */
const Inbox = ({ onDocClick }) => {
  const EMPTY_FILTERS = { stato:"", canale:"", cat:"", importo:"", data:"", scadenza:"" };
  const [quickFilter,  setQuickFilter] = useState("all");
  const [search,       setSearch]      = useState("");
  const [colFilters,   setColFilters]  = useState(EMPTY_FILTERS);
  const [openCol,      setOpenCol]     = useState(null);
  const [sortCol,      setSortCol]     = useState(null);   // "date"|"amount"|"deadline"|"subject"
  const [sortDir,      setSortDir]     = useState("desc"); // "asc"|"desc"

  const quickFilters = [
    { key:"all",    label:"Tutti" },
    { key:"unread", label:"Non letti" },
    { key:"urgent", label:"Urgenti" },
    { key:"PEC",    label:"PEC" },
    { key:"EMAIL",  label:"Email" },
    { key:"REM",    label:"REM" },
  ];

  // ── option lists ──
  const allD = MOCK_DOCS;
  const statoOpts   = ["Non letto","Letto","Urgente"];
  const channels    = [...new Set(allD.map(d => d.channel))];
  const cats        = [...new Set(allD.map(d => d.category))];
  const importoOpts = ["Con importo","Senza importo","< 100€","100–500€","500–1000€","> 1000€"];
  const dataOpts    = [...new Set(allD.map(d => d.date.slice(0,7)))].sort().reverse();
  const scadOpts    = ["Scaduto","Entro 7 gg","Entro 30 gg","Oltre 30 gg","Nessuna scadenza"];

  // ── toggles ──
  const setCol = (col, val) => {
    setColFilters(prev => ({ ...prev, [col]: prev[col]===val ? "" : val }));
    setOpenCol(null);
  };
  const clearCol = (col, e) => { e.stopPropagation(); setColFilters(prev => ({ ...prev, [col]:"" })); };
  const resetAll = () => { setColFilters(EMPTY_FILTERS); setQuickFilter("all"); setSearch(""); setSortCol(null); };
  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d==="asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  // ── parse amount ──
  const parseAmt = str => str ? parseFloat(str.replace(/[^0-9,.]/g,"").replace(",",".")) || 0 : null;

  // ── filter pipeline ──
  const base = allD.filter(d => {
    if (quickFilter==="unread") return !d.read;
    if (quickFilter==="urgent") return d.urgent;
    if (quickFilter==="PEC"||quickFilter==="EMAIL"||quickFilter==="REM") return d.channel===quickFilter;
    return true;
  }).filter(d =>
    !search || d.subject.toLowerCase().includes(search.toLowerCase()) ||
    d.from.toLowerCase().includes(search.toLowerCase())
  ).filter(d => {
    const { stato, canale, cat, importo, data, scadenza } = colFilters;
    if (stato==="Non letto" && d.read)  return false;
    if (stato==="Letto"     && !d.read) return false;
    if (stato==="Urgente"   && !d.urgent) return false;
    if (canale && d.channel  !== canale) return false;
    if (cat    && d.category !== cat)   return false;
    const amt = parseAmt(d.amount);
    if (importo==="Con importo"    && !d.amount)  return false;
    if (importo==="Senza importo"  &&  d.amount)  return false;
    if (importo==="< 100€"         && (amt===null||amt>=100))   return false;
    if (importo==="100–500€"       && (amt===null||amt<100||amt>500))  return false;
    if (importo==="500–1000€"      && (amt===null||amt<500||amt>1000)) return false;
    if (importo==="> 1000€"        && (amt===null||amt<=1000))  return false;
    if (data && !d.date.startsWith(data)) return false;
    if (scadenza) {
      const days = daysUntil(d.deadline);
      if (scadenza==="Scaduto"         && (days===null||days>=0))        return false;
      if (scadenza==="Entro 7 gg"      && (days===null||days<0||days>7)) return false;
      if (scadenza==="Entro 30 gg"     && (days===null||days<0||days>30)) return false;
      if (scadenza==="Oltre 30 gg"     && (days===null||days<=30))       return false;
      if (scadenza==="Nessuna scadenza"&& days!==null)                   return false;
    }
    return true;
  });

  // ── sort ──
  const filtered = [...base].sort((a,b) => {
    if (!sortCol) return 0;
    let va, vb;
    if (sortCol==="date")     { va=a.date;     vb=b.date; }
    if (sortCol==="subject")  { va=a.subject;  vb=b.subject; }
    if (sortCol==="amount")   { va=parseAmt(a.amount)||0; vb=parseAmt(b.amount)||0; }
    if (sortCol==="deadline") {
      va=daysUntil(a.deadline)??9999;
      vb=daysUntil(b.deadline)??9999;
    }
    if (va<vb) return sortDir==="asc" ? -1 : 1;
    if (va>vb) return sortDir==="asc" ?  1 : -1;
    return 0;
  });

  const activeCount = Object.values(colFilters).filter(Boolean).length;

  // ── SortIcon ──
  const SortIcon = ({ col }) => {
    const active = sortCol===col;
    return (
      <span onClick={e=>{ e.stopPropagation(); toggleSort(col); }}
        style={{ marginLeft:5, cursor:"pointer", opacity: active ? 1 : 0.35,
          color: active ? "var(--red)" : "var(--text3)", fontSize:10, userSelect:"none" }}>
        {active && sortDir==="asc" ? "▲" : "▼"}
      </span>
    );
  };

  // ── ColFilter dropdown ──
  const ColFilter = ({ col, options, labelFn }) => {
    const isOpen = openCol===col;
    const active = colFilters[col];
    return (
      <span style={{ position:"relative", display:"inline-flex", alignItems:"center" }}
        onClick={e => e.stopPropagation()}>
        {/* trigger button */}
        <button
          onClick={() => setOpenCol(isOpen ? null : col)}
          title={active ? `Filtro attivo: ${labelFn ? labelFn(active) : active}` : "Filtra"}
          style={{
            background: active ? "var(--red)" : "transparent",
            border: `1px solid ${active ? "var(--red)" : "transparent"}`,
            borderRadius: 4, padding:"1px 4px", cursor:"pointer",
            fontSize:10, fontWeight:700,
            color: active ? "#FEFAEF" : "var(--text3)",
            marginLeft:4, display:"inline-flex", alignItems:"center",
            fontFamily:"var(--font)", transition:"all 0.15s", lineHeight:1,
            boxShadow: active ? "0 1px 4px rgba(176,32,40,0.25)" : "none"
          }}>
          {active
            ? <><span>▾</span><span onClick={e => clearCol(col,e)} style={{marginLeft:3,opacity:0.85,fontSize:9}}>✕</span></>
            : <span>▾</span>
          }
        </button>

        {/* dropdown */}
        {isOpen && (
          <div style={{
            position:"absolute", top:"calc(100% + 6px)",
            left: 0,
            zIndex:300, minWidth:180,
            background:"var(--card)", border:"1px solid var(--border)", borderRadius:10,
            boxShadow:"0 12px 32px rgba(0,0,0,0.18)", overflow:"hidden"
          }}>
            {/* header */}
            <div style={{ padding:"8px 12px 6px", borderBottom:"1px solid var(--border)",
              fontSize:10, fontWeight:700, color:"var(--text3)", textTransform:"uppercase", letterSpacing:"0.6px" }}>
              Filtra per {col}
            </div>
            {/* options */}
            <div style={{ maxHeight:220, overflowY:"auto" }}>
              {options.map(opt => {
                const label = labelFn ? labelFn(opt) : opt;
                const isActive = active===opt;
                return (
                  <button key={opt} onClick={() => setCol(col, opt)}
                    style={{
                      width:"100%", padding:"8px 14px",
                      background: isActive ? "var(--red-soft)" : "transparent",
                      border:"none", textAlign:"left", cursor:"pointer", fontSize:12.5,
                      color: isActive ? "var(--red)" : "var(--text)",
                      fontFamily:"var(--font)", fontWeight: isActive ? 700 : 400,
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      transition:"background 0.1s"
                    }}>
                    <span>{label}</span>
                    {isActive && <span style={{fontSize:11,color:"var(--red)"}}>✓</span>}
                  </button>
                );
              })}
            </div>
            {/* clear */}
            {active && (
              <div style={{ borderTop:"1px solid var(--border)", padding:"6px 8px" }}>
                <button onClick={() => setCol(col, active)}
                  style={{ width:"100%", padding:"6px 8px", background:"none", border:"none",
                    fontSize:11.5, color:"var(--text3)", cursor:"pointer", fontFamily:"var(--font)",
                    textAlign:"center", fontWeight:600 }}>
                  Rimuovi filtro
                </button>
              </div>
            )}
          </div>
        )}
      </span>
    );
  };

  // ── TH helper ──
  const Th = ({ children, sortKey, col, opts, labelFn, style }) => (
    <th style={{ userSelect:"none", ...style }}>
      <div style={{ display:"flex", alignItems:"center", gap:0, flexWrap:"nowrap" }}>
        {sortKey
          ? <span onClick={() => toggleSort(sortKey)} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:3 }}>
              {children}
              <SortIcon col={sortKey} />
            </span>
          : <span>{children}</span>
        }
        {col && <ColFilter col={col} options={opts} labelFn={labelFn} />}
      </div>
    </th>
  );

  return (
    <div className="fade-in" onClick={() => setOpenCol(null)}>
      {/* ── HEADER ── */}
      <div className="section-hdr">
        <div>
          <div className="section-title">Inbox Intelligente</div>
          <div className="section-sub">{filtered.length} / {allD.length} documenti • AI classifica in tempo reale</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div className="search-box" style={{ width:210 }}>
            <Icon name="search" size={13} color="var(--text3)" />
            <input placeholder="Cerca mittente o oggetto…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {(activeCount>0||search||quickFilter!=="all"||sortCol) && (
            <button onClick={resetAll} title="Reset tutti i filtri"
              style={{ background:"var(--red-soft)", border:"1px solid var(--red)", borderRadius:7,
                padding:"5px 11px", cursor:"pointer", fontSize:11.5, fontWeight:700,
                color:"var(--red)", fontFamily:"var(--font)", display:"flex", alignItems:"center", gap:5 }}>
              ✕ Reset filtri
              {activeCount>0 && <span style={{ background:"var(--red)", color:"#FEFAEF",
                borderRadius:"50%", width:16, height:16, fontSize:10, display:"flex",
                alignItems:"center", justifyContent:"center" }}>{activeCount}</span>}
            </button>
          )}
          <div className="icon-btn"><Icon name="refresh" size={14} /></div>
        </div>
      </div>

      {/* ── QUICK FILTERS ── */}
      <div className="filter-bar">
        {quickFilters.map(f => (
          <button key={f.key} className={`filter-btn ${quickFilter===f.key ? "active" : ""}`}
            onClick={() => setQuickFilter(f.key)}>
            {f.label}
            {f.key==="unread" && ` (${allD.filter(d=>!d.read).length})`}
            {f.key==="urgent" && ` (${allD.filter(d=>d.urgent).length})`}
          </button>
        ))}
      </div>

      {/* ── ACTIVE FILTER CHIPS ── */}
      {activeCount > 0 && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10, padding:"8px 12px",
          background:"var(--red-soft)", borderRadius:9, border:"1px solid rgba(176,32,40,0.15)" }}>
          <span style={{ fontSize:11, fontWeight:700, color:"var(--red)", marginRight:2, alignSelf:"center" }}>
            Filtri attivi:
          </span>
          {Object.entries(colFilters).filter(([,v])=>v).map(([col,val]) => {
            const label = col==="cat" ? getCategoryInfo(val).label : val;
            return (
              <span key={col} style={{ display:"inline-flex", alignItems:"center", gap:5,
                background:"var(--red)", color:"#FEFAEF", borderRadius:20,
                padding:"3px 10px", fontSize:11, fontWeight:600 }}>
                <span style={{ textTransform:"capitalize", opacity:0.75 }}>{col}:</span>
                <span>{label}</span>
                <button onClick={() => setColFilters(p=>({...p,[col]:""}))}
                  style={{ background:"none",border:"none",color:"#FEFAEF",cursor:"pointer",
                    fontSize:12,padding:0,lineHeight:1,opacity:0.8,fontFamily:"var(--font)" }}>✕</button>
              </span>
            );
          })}
        </div>
      )}

      {/* ── TABLE ── */}
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        {filtered.length===0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-text">Nessun documento corrisponde ai filtri attivi</div>
            <button onClick={resetAll}
              style={{ marginTop:10, background:"var(--red-soft)", border:"1px solid var(--red)",
                borderRadius:7, padding:"7px 18px", cursor:"pointer", fontSize:12,
                fontWeight:700, color:"var(--red)", fontFamily:"var(--font)" }}>
              Rimuovi tutti i filtri
            </button>
          </div>
        ) : (
          <table className="doc-table">
            <thead>
              <tr>
                <Th col="stato" opts={statoOpts} style={{ paddingLeft:16, width:90 }}>Stato</Th>
                <Th col="canale"   opts={channels}    style={{ width:90  }}>Canale</Th>
                <Th col="cat" opts={cats} labelFn={code=>getCategoryInfo(code).label}>
                  Documento
                </Th>
                <Th col="importo" opts={importoOpts}>Importo</Th>
                <Th col="data"    opts={dataOpts}>Data</Th>
                <Th col="scadenza" opts={scadOpts}>Scadenza</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const cat = getCategoryInfo(doc.category);
                return (
                  <tr key={doc.id} className={`doc-row ${!doc.read?"unread":""}`} onClick={() => onDocClick(doc)}>
                    {/* Stato — dot + pills inline */}
                    <td style={{ paddingLeft:16, width:90 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <div className="urgency-dot" style={{
                          background: !doc.read ? (doc.urgent ? "var(--red)" : "var(--red-mid)") : "transparent",
                          border: doc.read ? "1.5px solid var(--border)" : "none",
                          flexShrink:0
                        }} />
                        {doc.urgent && (
                          <span style={{ fontSize:9, fontWeight:800, color:"var(--red)",
                            border:"1px solid var(--red)", borderRadius:3,
                            padding:"1px 4px", letterSpacing:"0.3px", lineHeight:1.4 }}>URG</span>
                        )}
                        {!doc.read && !doc.urgent && (
                          <span style={{ fontSize:9, fontWeight:700, color:"var(--red-mid)",
                            border:"1px solid var(--red-mid)", borderRadius:3,
                            padding:"1px 4px", letterSpacing:"0.3px", lineHeight:1.4 }}>NEW</span>
                        )}
                      </div>
                    </td>
                    {/* Canale */}
                    <td><ChannelTag channel={doc.channel} /></td>
                    {/* Documento + categoria */}
                    <td>
                      <div className="doc-subject" style={{ fontWeight: !doc.read ? 700 : 400 }}>{doc.subject}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:2 }}>
                        <span className="doc-from">{doc.from}</span>
                        <span style={{ fontSize:10, fontWeight:600, color:cat.color,
                          background:`${cat.color}18`, padding:"1px 5px", borderRadius:3 }}>{cat.label}</span>
                      </div>
                    </td>
                    {/* Importo */}
                    <td style={{ fontFamily:"var(--mono)", fontSize:12,
                      fontWeight: doc.amount ? 700 : 400,
                      color: doc.amount ? "var(--text)" : "var(--text3)" }}>
                      {doc.amount || "—"}
                    </td>
                    {/* Data */}
                    <td><span className="date-text">{doc.date}</span></td>
                    {/* Scadenza */}
                    <td><DeadlineBadge deadline={doc.deadline} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CATEGORY LANDING
───────────────────────────────────────────── */
const CategoryLanding = ({ cat, onBack, onDocClick, allDocs = MOCK_DOCS, onRemove }) => {
  const [docs, setDocs] = useState(
    allDocs.filter(d => d.category === cat.code).map(d => ({ ...d }))
  );
  const [activeTab, setActiveTab]       = useState("unmanaged");
  const [confirmRemove, setConfirmRemove] = useState(null); // doc id pending confirm

  const managed   = docs.filter(d =>  d.managed);
  const unmanaged = docs.filter(d => !d.managed);

  const toggleManaged = (id) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, managed: !d.managed } : d));
  };

  const removeDoc = (id) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    if (onRemove) onRemove(id);
    setConfirmRemove(null);
  };

  const pct = docs.length > 0 ? Math.round((managed.length / docs.length) * 100) : 0;
  const visibleDocs = activeTab === "unmanaged" ? unmanaged : managed;

  const DocRow = ({ doc }) => {
    const isConfirming = confirmRemove === doc.id;
    return (
    <div className="cat-doc-row">
      <div
        className="cat-doc-status"
        style={{
          background: doc.managed ? `${cat.color}18` : "var(--red-pale)",
          border: `1px solid ${doc.managed ? cat.color+"40" : "var(--border)"}`,
        }}
      >
        {doc.managed
          ? <Icon name="check"   size={13} color={cat.color} />
          : <Icon name="warning" size={13} color="var(--red-mid)" />
        }
      </div>

      <div className="cat-doc-body" onClick={() => onDocClick(doc)} style={{ cursor:"pointer" }}>
        <div className="cat-doc-subject">{doc.subject}</div>
        <div className="cat-doc-from">{doc.from}</div>
        <div className="cat-doc-meta">
          <ChannelTag channel={doc.channel} />
          <span className="date-text">{doc.date}</span>
          {doc.deadline && <DeadlineBadge deadline={doc.deadline} />}
        </div>
      </div>

      <div className="cat-doc-right">
        {doc.amount && (
          <span className="cat-amount" style={{ color: doc.managed ? "var(--text2)" : cat.color }}>
            {doc.amount}
          </span>
        )}
        <button
          className={`cat-manage-btn ${doc.managed ? "unmark" : "mark"}`}
          onClick={(e) => { e.stopPropagation(); toggleManaged(doc.id); }}
        >
          {doc.managed ? "Riapri pratica" : "Segna come gestita"}
        </button>

        {/* Remove button */}
        {!isConfirming ? (
          <button
            onClick={(e) => { e.stopPropagation(); setConfirmRemove(doc.id); }}
            title="Rimuovi dal cassetto"
            style={{ background:"none", border:"1px solid var(--border)", borderRadius:6,
              color:"var(--text3)", fontSize:14, cursor:"pointer", padding:"3px 8px",
              lineHeight:1, transition:"all 0.13s", marginTop:4 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#E02834"; e.currentTarget.style.color="#E02834"; e.currentTarget.style.background="rgba(224,40,52,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text3)"; e.currentTarget.style.background="none"; }}
          >🗑</button>
        ) : (
          <div style={{ display:"flex", gap:5, marginTop:4 }} onClick={e => e.stopPropagation()}>
            <button onClick={() => removeDoc(doc.id)}
              style={{ padding:"3px 10px", borderRadius:6, border:"none", background:"#E02834",
                color:"#FEFAEF", fontSize:11.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
              Rimuovi
            </button>
            <button onClick={() => setConfirmRemove(null)}
              style={{ padding:"3px 8px", borderRadius:6, border:"1px solid var(--border)",
                background:"none", color:"var(--text2)", fontSize:11.5, cursor:"pointer", fontFamily:"var(--font)" }}>
              Annulla
            </button>
          </div>
        )}
      </div>
    </div>
  );};

  return (
    <div className="fade-in">
      {/* HEADER */}
      <div className="cat-landing-header">
        <div style={{ flex:1, minWidth:0 }}>
          <div className="cat-title-big">{cat.label}</div>

          <div className="cat-meta-row">
            <span className="cat-stat-pill" style={{ color:cat.color, background:`${cat.color}12`, borderColor:`${cat.color}40` }}>
              <Icon name="doc" size={12} color={cat.color} />
              {docs.length} {docs.length === 1 ? "pratica" : "pratiche"}
            </span>
            <span className="cat-stat-pill" style={{ color:"var(--red)", background:"var(--red-soft)", borderColor:"var(--border)" }}>
              <Icon name="warning" size={12} color="var(--red)" />
              {unmanaged.length} da gestire
            </span>
            <span className="cat-stat-pill" style={{ color:"var(--text2)", background:"var(--surface)", borderColor:"var(--border)" }}>
              <Icon name="check" size={12} color="var(--text2)" />
              {managed.length} gestite
            </span>
            <span className="risk-pill" style={{ color:cat.color, background:`${cat.color}20` }}>
              rischio {cat.risk}
            </span>
          </div>

          {docs.length > 0 && (
            <div className="cat-progress-summary">
              <div className="cat-progress-bar-wrap">
                <div className="cat-progress-label">Avanzamento gestione pratiche — {pct}%</div>
                <div className="progress-bar" style={{ height:7, borderRadius:4 }}>
                  <div className="progress-fill" style={{ width:`${pct}%`, background:cat.color, borderRadius:4 }} />
                </div>
              </div>
              <div style={{ fontFamily:"var(--mono)", fontSize:16, fontWeight:800, color:cat.color, flexShrink:0 }}>
                {managed.length}/{docs.length}
              </div>
            </div>
          )}
        </div>

        <button className="cat-back-btn" onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Torna all'archivio
        </button>
      </div>

      {/* CASSETTO SEARCH */}
      <CatSearch docs={docs} onSelect={onDocClick} />

      {/* TAB BUTTONS */}
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        {[
          { key:"unmanaged", label:"Pratiche non gestite", count:unmanaged.length, icon:"warning", activeColor:"var(--red)", activeBorder:"var(--red)" },
          { key:"managed",   label:"Pratiche gestite",     count:managed.length,   icon:"check",   activeColor:cat.color,    activeBorder:cat.color    },
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex:1, padding:"13px 18px", borderRadius:10, cursor:"pointer",
                fontFamily:"var(--font)", fontSize:13.5, fontWeight:700,
                border: isActive ? `2px solid ${tab.activeBorder}` : "1px solid var(--border)",
                background: isActive ? tab.activeColor : "var(--card)",
                color: isActive ? "#FEFAEF" : "var(--text2)",
                transition:"all 0.15s",
                display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                boxShadow: isActive ? `0 4px 14px ${tab.activeColor}30` : "none",
              }}
            >
              <Icon name={tab.icon} size={14} color={isActive ? "#FEFAEF" : tab.activeColor} />
              {tab.label}
              <span style={{
                background: isActive ? "rgba(255,255,255,0.22)" : tab.key === "unmanaged" ? "var(--red-pale)" : `${cat.color}18`,
                color: isActive ? "#FEFAEF" : tab.activeColor,
                borderRadius:10, fontSize:11, fontWeight:800,
                padding:"1px 8px", fontFamily:"var(--mono)",
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* DOCUMENT LIST */}
      <div className="fade-in" style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        {visibleDocs.length === 0 ? (
          <div className="cat-empty-section" style={{ padding:"52px 20px" }}>
            {activeTab === "unmanaged"
              ? "✓ Tutte le pratiche di questa categoria sono state gestite"
              : "Nessuna pratica gestita in questa categoria"}
          </div>
        ) : (
          visibleDocs.map(doc => <DocRow key={doc.id} doc={doc} />)
        )}
      </div>
    </div>
  );
};

/* ─── ARCHIVE ─── */
/* ── AI category guesser based on filename keywords ── */
const guessCategory = (filename, customCats = []) => {
  const n = filename.toLowerCase();
  // check custom categories first (user-defined keywords take priority)
  for (const cat of customCats) {
    if (cat.keywords && cat.keywords.some(k => k && n.includes(k))) return cat.code;
  }
  if (/multa|sanzione|cartella|ingiunz/.test(n))   return "C02";
  if (/fattura|f24|ricevuta|invoice/.test(n))       return "C04";
  if (/contratto|accordo|polizza/.test(n))          return "C05";
  if (/avviso|pagamento|bolletta/.test(n))          return "C01";
  if (/atto|ordinanza|pec|tribunale|ade/.test(n))   return "C03";
  if (/scadenza|rinnovo|abbonamento/.test(n))       return "C06";
  if (/certificato|documento|carta|passaporto/.test(n)) return "C11";
  if (/appuntamento|convocazione|assemblea/.test(n))  return "C09";
  if (/richiesta|integrare|completare/.test(n))    return "C07";
  if (/lavoro|cliente|fornitore|preventivo/.test(n))  return "C12";
  // default: pick semi-randomly from C01–C12
  const fallbacks = ["C01","C03","C04","C05","C07","C11"];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const UploadModal = ({ onClose, onConfirm, customCats = [], allCategories = CATEGORIES }) => {
  const [step, setStep]         = useState("pick");   // pick | analyzing | result
  const [file, setFile]         = useState(null);
  const [isDrag, setIsDrag]     = useState(false);
  const [detectedCat, setDetectedCat] = useState(null);
  const [chosenCat, setChosenCat]     = useState(null);
  const [progress, setProgress]       = useState(0);
  const fileRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setStep("analyzing");
    setProgress(0);
    // simulate progressive AI analysis
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) { p = 100; clearInterval(iv); }
      setProgress(Math.min(Math.round(p), 100));
    }, 120);
    setTimeout(() => {
      clearInterval(iv);
      setProgress(100);
      const cat = guessCategory(f.name, customCats);
      setDetectedCat(cat);
      setChosenCat(cat);
      setStep("result");
    }, 2200);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setIsDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const confirm = () => {
    const today = new Date().toISOString().split("T")[0];
    onConfirm({
      id: Date.now(),
      channel: "LOCALE",
      from: "Caricamento manuale",
      subject: file.name.replace(/\.[^.]+$/, ""),
      date: today,
      category: chosenCat,
      read: true,
      urgent: false,
      amount: null,
      deadline: null,
      managed: false,
      localFile: true,
    });
    onClose();
  };

  const catInfo = chosenCat ? getCategoryInfo(chosenCat) : null;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.5)", zIndex:300,
      display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={step === "analyzing" ? undefined : onClose}>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:18,
        padding:"30px 28px 26px", width:440, boxShadow:"0 20px 56px rgba(224,40,52,0.18)" }}
        onClick={e => e.stopPropagation()}>

        {/* ── HEADER ── */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
          <div style={{ width:42, height:42, borderRadius:11, background:"var(--red-soft)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📂</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>Carica documento locale</div>
            <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:2 }}>
              {step === "pick"      && "Trascina o seleziona un file da archiviare"}
              {step === "analyzing" && "L'agente IA sta analizzando il documento…"}
              {step === "result"    && "Classificazione completata — conferma o modifica"}
            </div>
          </div>
          {step !== "analyzing" && (
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", fontSize:22, lineHeight:1, padding:4 }}>×</button>
          )}
        </div>

        {/* ── STEP: PICK ── */}
        {step === "pick" && (
          <>
            <div
              onDragOver={e => { e.preventDefault(); setIsDrag(true); }}
              onDragLeave={() => setIsDrag(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              style={{ border:`2px dashed ${isDrag ? "var(--red)" : "var(--border)"}`,
                borderRadius:12, padding:"32px 20px", textAlign:"center", cursor:"pointer",
                background: isDrag ? "var(--red-soft)" : "var(--surface)",
                transition:"all 0.15s", marginBottom:16 }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📎</div>
              <div style={{ fontSize:13.5, fontWeight:600, color:"var(--text)", marginBottom:4 }}>
                Trascina qui il tuo file
              </div>
              <div style={{ fontSize:11.5, color:"var(--text3)" }}>oppure clicca per sfogliare</div>
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:8 }}>
                PDF, immagini, Word, Excel, testo…
              </div>
              <input ref={fileRef} type="file" style={{ display:"none" }}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt,.eml"
                onChange={e => handleFile(e.target.files[0])} />
            </div>
            <button onClick={onClose}
              style={{ width:"100%", padding:"9px", borderRadius:8, border:"1px solid var(--border)",
                background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                cursor:"pointer", fontFamily:"var(--font)" }}>Annulla</button>
          </>
        )}

        {/* ── STEP: ANALYZING ── */}
        {step === "analyzing" && (
          <div style={{ textAlign:"center", padding:"10px 0 16px" }}>
            <div style={{ fontSize:13, color:"var(--text2)", marginBottom:6 }}>
              <strong style={{ color:"var(--text)" }}>{file?.name}</strong>
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center", margin:"22px 0 10px",
              background:"var(--surface)", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontSize:22 }}>🤖</div>
              <div style={{ flex:1, textAlign:"left" }}>
                {[
                  progress < 30  && "Lettura del documento…",
                  progress >= 30 && progress < 65  && "Estrazione testo e metadati…",
                  progress >= 65 && progress < 90  && "Identificazione categoria…",
                  progress >= 90 && "Assegnazione al cassetto…",
                ].filter(Boolean)[0]}
              </div>
              <div style={{ fontFamily:"var(--mono)", fontSize:13, color:"var(--red)", fontWeight:700 }}>
                {progress}%
              </div>
            </div>
            <div style={{ background:"var(--red-pale)", borderRadius:8, height:8, overflow:"hidden" }}>
              <div style={{ height:"100%", background:"var(--red)", borderRadius:8,
                width:`${progress}%`, transition:"width 0.12s linear" }} />
            </div>
          </div>
        )}

        {/* ── STEP: RESULT ── */}
        {step === "result" && catInfo && (
          <>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)",
              borderRadius:10, padding:"14px 16px", marginBottom:16 }}>
              <div style={{ fontSize:11.5, color:"var(--text3)", marginBottom:6 }}>File caricato</div>
              <div style={{ fontSize:13, fontWeight:600, color:"var(--text)", display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:16 }}>📄</span>
                {file?.name}
                <span style={{ fontSize:11, color:"var(--text3)", fontFamily:"var(--mono)", marginLeft:"auto" }}>
                  {file ? (file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+"MB" : Math.round(file.size/1024)+"KB") : ""}
                </span>
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--text2)", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                🤖 Categoria rilevata dall'agente IA
                <span style={{ fontSize:10.5, color:"var(--red)", background:"var(--red-soft)",
                  padding:"1px 7px", borderRadius:10, fontWeight:700 }}>
                  {detectedCat === chosenCat ? "automatica" : "modificata"}
                </span>
              </div>
              <select value={chosenCat} onChange={e => setChosenCat(e.target.value)}
                style={{ width:"100%", padding:"10px 12px", borderRadius:8,
                  border:`2px solid ${catInfo.color}`, background:"var(--surface)",
                  color:"var(--text)", fontSize:13.5, fontFamily:"var(--font)",
                  fontWeight:600, outline:"none", cursor:"pointer" }}>
                {CATEGORIES.filter(c => c.code !== "C13" && c.code !== "C14").concat(allCategories.filter(c => c.custom)).map(c => (
                  <option key={c.code} value={c.code}>{c.code} — {c.label}</option>
                ))}
              </select>
              <div style={{ marginTop:8, display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:11.5, fontWeight:600, color:catInfo.color,
                  background:`${catInfo.color}18`, padding:"3px 9px", borderRadius:8 }}>
                  Rischio: {catInfo.risk}
                </span>
                {detectedCat === chosenCat && (
                  <span style={{ fontSize:11, color:"var(--text3)" }}>Modifica se la categoria non è corretta</span>
                )}
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={onClose}
                style={{ flex:1, padding:"10px", borderRadius:8, border:"1px solid var(--border)",
                  background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)" }}>Annulla</button>
              <button onClick={confirm}
                style={{ flex:2, padding:"10px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                ✓ Archivia nel cassetto
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Archive = ({ onDocClick, allDocs = MOCK_DOCS, setAllDocs }) => {
  const [selectedCat, setSelectedCat]     = useState(null);
  const docs    = allDocs;
  const setDocs = setAllDocs || (() => {});
  const [showUpload, setShowUpload]       = useState(false);
  const [showWizard, setShowWizard]       = useState(false);
  const [customCats, setCustomCats]       = useState([]);
  const [hiddenCats, setHiddenCats]       = useState([]);       // built-in cats hidden by user
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(null); // cat.code pending deletion
  const [justAdded, setJustAdded]         = useState(null);
  const [justAddedCat, setJustAddedCat]   = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);

  const allCategories = [...CATEGORIES, ...customCats].filter(c => !hiddenCats.includes(c.code));

  // Duplicate detection state: { incoming, existing }
  const [dupAlert, setDupAlert] = useState(null);

  // Similarity check: same subject (fuzzy) or same amount+from+category within 30 days
  const findDuplicate = (newDoc) => {
    const normalize = s => s.toLowerCase().replace(/\s+/g, " ").trim();
    const newNorm   = normalize(newDoc.subject);
    return docs.find(d => {
      // exact subject match
      if (normalize(d.subject) === newNorm) return true;
      // same sender + same amount + same category within 30 days
      if (newDoc.from && d.from &&
          newDoc.from === d.from &&
          newDoc.amount && d.amount && newDoc.amount === d.amount &&
          newDoc.category === d.category) {
        const daysDiff = Math.abs(new Date(newDoc.date) - new Date(d.date)) / 86400000;
        if (daysDiff <= 30) return true;
      }
      return false;
    }) || null;
  };

  const handleUploadConfirm = (newDoc) => {
    const dup = findDuplicate(newDoc);
    if (dup) {
      setDupAlert({ incoming: newDoc, existing: dup });
      return; // pause — wait for user decision
    }
    commitDoc(newDoc);
  };

  const commitDoc = (doc) => {
    setDocs(prev => [doc, ...prev]);
    setJustAdded(doc.id);
    setTimeout(() => setJustAdded(null), 3000);
  };

  const handleDupDecision = (action) => {
    if (!dupAlert) return;
    const { incoming, existing } = dupAlert;
    if (action === "keep-both") {
      commitDoc(incoming);
    } else if (action === "replace") {
      setDocs(prev => [incoming, ...prev.filter(d => d.id !== existing.id)]);
      setJustAdded(incoming.id);
      setTimeout(() => setJustAdded(null), 3000);
    }
    // "discard" → do nothing, just close
    setDupAlert(null);
  };

  const handleDeleteCat = (catCode) => {
    const isCustom = customCats.some(c => c.code === catCode);
    if (isCustom) setCustomCats(prev => prev.filter(c => c.code !== catCode));
    else          setHiddenCats(prev => [...prev, catCode]);
    setConfirmDeleteCat(null);
  };

  const handleNewCategory = (cat) => {
    setCustomCats(prev => [...prev, cat]);
    setJustAddedCat(cat.code);
    setTimeout(() => setJustAddedCat(null), 3500);
  };

  const catCounts    = {};
  const catManaged   = {};
  const catUnmanaged = {};
  docs.forEach(d => {
    catCounts[d.category]    = (catCounts[d.category] || 0) + 1;
    if (d.managed) catManaged[d.category]   = (catManaged[d.category] || 0) + 1;
    else           catUnmanaged[d.category] = (catUnmanaged[d.category] || 0) + 1;
  });

  if (selectedCat) {
    return (
      <CategoryLanding
        cat={selectedCat}
        onBack={() => setSelectedCat(null)}
        onDocClick={onDocClick}
        allDocs={docs}
        onRemove={(id) => setDocs(prev => prev.filter(d => d.id !== id))}
      />
    );
  }

  return (
    <div className="fade-in">
      {showWizard && <NewCategoryModal onClose={() => setShowWizard(false)} onConfirm={handleNewCategory} existingCodes={customCats.map(c => c.code)} />}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} onConfirm={handleUploadConfirm} customCats={customCats} allCategories={allCategories} />}

      {/* ── DUPLICATE ALERT MODAL ── */}
      {dupAlert && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.55)", zIndex:500,
          display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={() => setDupAlert(null)}>
          <div style={{ background:"var(--card)", border:"2px solid var(--red)", borderRadius:18,
            padding:"28px 26px 24px", width:460, boxShadow:"0 24px 64px rgba(224,40,52,0.25)",
            position:"relative" }}
            onClick={e => e.stopPropagation()}>

            {/* header */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:20 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:"rgba(224,40,52,0.12)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>⚠️</div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:"var(--text)", marginBottom:3 }}>
                  Documento potenzialmente duplicato
                </div>
                <div style={{ fontSize:12.5, color:"var(--text2)", lineHeight:1.5 }}>
                  Il documento in arrivo è simile a uno già presente in archivio. Come vuoi procedere?
                </div>
              </div>
            </div>

            {/* comparison cards */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
              {[
                { label:"Già in archivio", doc: dupAlert.existing, accent:"var(--text3)", bg:"var(--surface)" },
                { label:"In arrivo", doc: dupAlert.incoming, accent:"var(--red)", bg:"var(--red-soft)" },
              ].map(({ label, doc, accent, bg }) => {
                const cat = getCategoryInfo(doc.category);
                return (
                  <div key={label} style={{ background:bg, border:`1px solid ${accent}30`,
                    borderRadius:10, padding:"12px 13px" }}>
                    <div style={{ fontSize:10, fontWeight:800, color:accent, textTransform:"uppercase",
                      letterSpacing:"0.6px", marginBottom:8 }}>{label}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:4,
                      lineHeight:1.35 }}>{doc.subject}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", marginBottom:3 }}>{doc.from}</div>
                    <div style={{ fontSize:10.5, color:"var(--text3)" }}>{doc.date}</div>
                    <span style={{ display:"inline-block", marginTop:6, fontSize:10.5, fontWeight:600,
                      color:cat.color, background:`${cat.color}18`, padding:"1px 7px", borderRadius:5 }}>
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* actions */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <button onClick={() => handleDupDecision("keep-both")}
                style={{ padding:"11px 16px", borderRadius:9, border:"1px solid var(--border)",
                  background:"var(--surface)", color:"var(--text)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)", textAlign:"left", display:"flex",
                  alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>📋</span>
                <div>
                  <div style={{ fontWeight:700 }}>Mantieni entrambi</div>
                  <div style={{ fontSize:11, color:"var(--text3)", fontWeight:400 }}>Archivia il nuovo documento conservando quello esistente</div>
                </div>
              </button>
              <button onClick={() => handleDupDecision("replace")}
                style={{ padding:"11px 16px", borderRadius:9, border:"1px solid rgba(224,40,52,0.3)",
                  background:"rgba(224,40,52,0.06)", color:"var(--text)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)", textAlign:"left", display:"flex",
                  alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>🔄</span>
                <div>
                  <div style={{ fontWeight:700 }}>Sostituisci il precedente</div>
                  <div style={{ fontSize:11, color:"var(--text3)", fontWeight:400 }}>Rimuovi la versione esistente e archivia quella nuova</div>
                </div>
              </button>
              <button onClick={() => handleDupDecision("discard")}
                style={{ padding:"11px 16px", borderRadius:9, border:"1px solid var(--border)",
                  background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)", textAlign:"left", display:"flex",
                  alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>🗑️</span>
                <div>
                  <div style={{ fontWeight:700 }}>Scarta il nuovo</div>
                  <div style={{ fontSize:11, color:"var(--text3)", fontWeight:400 }}>Il documento in arrivo viene ignorato, mantieni solo l'esistente</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section-hdr">
        <div>
          <div className="section-title">Archivio Documenti</div>
          <div className="section-sub">{allCategories.length} categorie • {docs.length} documenti totali — clicca una categoria per i dettagli</div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <div className="ai-chip"><span className="ai-dot" />Classificazione automatica attiva</div>
          <button onClick={() => setShowUpload(true)}
            style={{ width:34, height:34, borderRadius:"50%", border:"none",
              background:"var(--red)", color:"#FEFAEF", fontSize:22, lineHeight:1,
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", boxShadow:"0 2px 8px rgba(224,40,52,0.35)",
              flexShrink:0, fontWeight:300, transition:"transform 0.12s, box-shadow 0.12s" }}
            title="Carica documento locale"
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.10)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(224,40,52,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 2px 8px rgba(224,40,52,0.35)"; }}>
            +
          </button>
        </div>
      </div>

      {justAdded && (
        <div style={{ marginBottom:14, background:"#e8f7ee", border:"1px solid #6fcf97",
          borderRadius:10, padding:"10px 16px", display:"flex", alignItems:"center", gap:10,
          fontSize:13, color:"#1a7a3f", fontWeight:600, animation:"fadeIn 0.3s" }}>
          ✓ Documento archiviato con successo dall'agente IA
        </div>
      )}

      {justAddedCat && (
        <div style={{ marginBottom:14, background:"var(--red-soft)", border:"1px solid var(--red)",
          borderRadius:10, padding:"10px 16px", display:"flex", alignItems:"center", gap:10,
          fontSize:13, color:"var(--red)", fontWeight:600 }}>
          🗂️ Nuovo cassetto personalizzato creato — l'agente IA è pronto a classificare
        </div>
      )}

      <div className="archive-grid">
        {allCategories.map(cat => {
          const count   = catCounts[cat.code]    || 0;
          const done    = catManaged[cat.code]   || 0;
          const pending = catUnmanaged[cat.code] || 0;
          const pct     = count > 0 ? Math.round((done / count) * 100) : 0;
          const isConfirmingDelete = confirmDeleteCat === cat.code;
          return (
            <div key={cat.code} className="archive-card"
              onClick={() => !isConfirmingDelete && count > 0 && setSelectedCat(cat)}
              style={{ cursor: count > 0 && !isConfirmingDelete ? "pointer" : "default",
                opacity: count === 0 && !isConfirmingDelete ? 0.5 : 1,
                outline: cat.code === justAddedCat ? `2px solid ${cat.color}` : "none",
                position: "relative" }}
            >
              {/* DELETE BUTTON — top-right, always visible */}
              {!isConfirmingDelete && (
                <button
                  onClick={e => { e.stopPropagation(); setConfirmDeleteCat(cat.code); }}
                  title="Rimuovi cassetto"
                  style={{ position:"absolute", top:8, right:8, width:22, height:22,
                    borderRadius:6, border:"1px solid transparent", background:"transparent",
                    cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                    color:"var(--text3)", fontSize:13, opacity:0, transition:"opacity 0.15s",
                    zIndex:2 }}
                  className="cat-delete-btn"
                >✕</button>
              )}

              {/* INLINE DELETE CONFIRM */}
              {isConfirmingDelete && (
                <div onClick={e => e.stopPropagation()}
                  style={{ position:"absolute", inset:0, borderRadius:10, zIndex:10,
                    background:"var(--card)", border:`2px solid var(--red)`,
                    display:"flex", flexDirection:"column", alignItems:"center",
                    justifyContent:"center", padding:"14px 12px", gap:8 }}>
                  <div style={{ fontSize:18 }}>🗂️</div>
                  <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", textAlign:"center" }}>
                    Rimuovi «{cat.label}»?
                  </div>
                  {count > 0 && (
                    <div style={{ fontSize:10.5, color:"var(--red)", textAlign:"center", fontWeight:600 }}>
                      ⚠ Contiene {count} documento{count !== 1 ? "i" : ""}
                    </div>
                  )}
                  <div style={{ display:"flex", gap:6, marginTop:2 }}>
                    <button onClick={() => setConfirmDeleteCat(null)}
                      style={{ padding:"5px 12px", borderRadius:6, border:"1px solid var(--border)",
                        background:"transparent", color:"var(--text2)", fontSize:11.5, fontWeight:600,
                        cursor:"pointer", fontFamily:"var(--font)" }}>Annulla</button>
                    <button onClick={() => handleDeleteCat(cat.code)}
                      style={{ padding:"5px 12px", borderRadius:6, border:"none",
                        background:"var(--red)", color:"#FEFAEF", fontSize:11.5, fontWeight:700,
                        cursor:"pointer", fontFamily:"var(--font)" }}>Rimuovi</button>
                  </div>
                </div>
              )}

              <div className="archive-card-top">
                <span className="risk-pill" style={{ color: cat.color, background: `${cat.color}20` }}>{cat.risk}</span>
                {cat.custom && <span style={{ fontSize:9.5, fontWeight:700, color:"#4A7C59", background:"rgba(74,124,89,0.12)", padding:"1px 6px", borderRadius:5 }}>custom</span>}
              </div>
              <div className="archive-card-count" style={{ color: count > 0 ? cat.color : "var(--text3)" }}>{count}</div>
              <div className="archive-card-label">{cat.label}</div>
              {count > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    {pending > 0
                      ? <span style={{ fontSize:10.5, color:"var(--red)", fontWeight:700 }}>⚠ {pending} da gestire</span>
                      : <span style={{ fontSize:10.5, color:cat.color, fontWeight:700 }}>✓ Tutte gestite</span>
                    }
                    <span style={{ fontSize:10.5, color:"var(--text3)", fontFamily:"var(--mono)" }}>{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width:`${pct}%`, background:cat.color }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* ── ADD CUSTOM CATEGORY CARD ── */}
        <div
          onClick={() => setShowWizard(true)}
          style={{ border:"2px dashed var(--border)", borderRadius:10, padding:16,
            cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", gap:8, minHeight:120, transition:"all 0.18s",
            background:"transparent" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.background="var(--red-soft)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="transparent"; }}
        >
          <div style={{ width:32, height:32, borderRadius:"50%", border:"2px dashed var(--border)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, color:"var(--text3)", lineHeight:1 }}>+</div>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text3)", textAlign:"center", lineHeight:1.35 }}>
            Aggiungi categoria
          </div>
          <div style={{ fontSize:10.5, color:"var(--text3)", textAlign:"center", lineHeight:1.4 }}>
            Crea un cassetto personalizzato con classificazione IA
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="section-hdr">
          <div className="section-title">Tutti i documenti archiviati</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 16 }}>Canale</th>
                <th>Documento</th>
                <th>Categoria</th>
                <th>Importo</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {docs.map(doc => {
                const cat = getCategoryInfo(doc.category);
                const isConfirming = confirmRemove === doc.id;
                return (
                  <tr key={doc.id} className="doc-row"
                    style={ doc.id === justAdded ? { background:"#f0faf4", transition:"background 0.5s" } : {} }>
                    <td style={{ paddingLeft: 16 }} onClick={() => onDocClick(doc)}><ChannelTag channel={doc.channel} /></td>
                    <td onClick={() => onDocClick(doc)}>
                      <div className="subject-text">{doc.subject}</div>
                      <div className="doc-from">{doc.from}</div>
                    </td>
                    <td onClick={() => onDocClick(doc)}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}18`, padding: "2px 7px", borderRadius: 5 }}>{cat.label}</span>
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12 }} onClick={() => onDocClick(doc)}>{doc.amount || "—"}</td>
                    <td onClick={() => onDocClick(doc)}><span className="date-text">{doc.date}</span></td>
                    <td style={{ textAlign:"right", paddingRight:12, whiteSpace:"nowrap" }}>
                      {!isConfirming ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmRemove(doc.id); }}
                          title="Rimuovi documento"
                          style={{ background:"none", border:"1px solid var(--border)", borderRadius:6,
                            color:"var(--text3)", fontSize:13, cursor:"pointer", padding:"3px 8px", lineHeight:1, transition:"all 0.13s" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor="#E02834"; e.currentTarget.style.color="#E02834"; e.currentTarget.style.background="rgba(224,40,52,0.07)"; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text3)"; e.currentTarget.style.background="none"; }}>
                          🗑
                        </button>
                      ) : (
                        <div style={{ display:"flex", gap:5, justifyContent:"flex-end" }}>
                          <button onClick={(e) => { e.stopPropagation(); setDocs(prev => prev.filter(d => d.id !== doc.id)); setConfirmRemove(null); }}
                            style={{ padding:"3px 10px", borderRadius:6, border:"none", background:"#E02834",
                              color:"#FEFAEF", fontSize:11.5, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                            Rimuovi
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setConfirmRemove(null); }}
                            style={{ padding:"3px 8px", borderRadius:6, border:"1px solid var(--border)",
                              background:"none", color:"var(--text2)", fontSize:11.5, cursor:"pointer", fontFamily:"var(--font)" }}>
                            Annulla
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── ALERTS ─── */
const Alerts = ({ onDocClick }) => {
  const urgentDocs = MOCK_DOCS.filter(d => d.urgent || (d.deadline && daysUntil(d.deadline) <= 21));
  urgentDocs.sort((a, b) => (daysUntil(a.deadline) || 999) - (daysUntil(b.deadline) || 999));

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Scadenze & Allerte</div>
          <div className="section-sub">A-ESP monitora continuamente i tuoi canali</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="warning" size={14} color="var(--red)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Azioni Richieste</span>
              <span className="nav-badge">{urgentDocs.filter(d => !d.read).length}</span>
            </div>
            {urgentDocs.map((doc, i) => {
              const d = daysUntil(doc.deadline);
              const isRed = d !== null && d <= 7;
              const color = isRed ? "var(--red)" : "var(--amber)";
              const cat = getCategoryInfo(doc.category);
              return (
                <div key={doc.id} className="timeline-item" style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => onDocClick(doc)}>
                  <div className="tl-line">
                    <div className="tl-dot" style={{ background: color }} />
                    {i < urgentDocs.length - 1 && <div className="tl-bar" />}
                  </div>
                  <div className="tl-content">
                    <div className="tl-date">{doc.deadline || doc.date} · <ChannelTag channel={doc.channel} /></div>
                    <div className="tl-title">{doc.from}</div>
                    <div style={{ fontSize: 12, color: "var(--text2)", margin: "2px 0 6px" }}>{doc.subject}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {doc.amount && <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color }}>{doc.amount}</span>}
                      
                      {d !== null && <DeadlineBadge deadline={doc.deadline} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="widget">
            <div className="widget-title">Sanzioni Potenziali</div>
            <div className="info-box-text" style={{ marginBottom: 14, fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>
              In caso di mancato pagamento entro le scadenze, si applicano sanzioni progressiva per ravvedimento operoso.
            </div>
            {[["Entro 14 gg", "+0.1%/giorno", "var(--red-mid)"], ["15–30 gg", "+1,5%", "var(--amber)"], ["31–90 gg", "+1,67%", "var(--amber)"], ["91 gg – 1 anno", "+3,75%", "var(--red)"], ["> 1 anno", "+4,29–5%", "var(--red)"]].map(([label, pct, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--mono)", color }}>{pct}</span>
              </div>
            ))}
          </div>

          <div className="widget">
            <div className="widget-title">Statistiche Canale</div>
            {[["PEC", MOCK_DOCS.filter(d => d.channel === "PEC").length, "var(--red)"], ["Email", MOCK_DOCS.filter(d => d.channel === "EMAIL").length, "var(--teal)"], ["REM/QeRDS", MOCK_DOCS.filter(d => d.channel === "REM").length, "var(--blue)"]].map(([label, count, color]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--mono)", color }}>{count} doc.</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(count / MOCK_DOCS.length) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── CONNECTIONS ─── */
const EMAIL_PROVIDERS = [
  { id: "gmail",   label: "Gmail",   icon: "G", color: "#E02834", placeholder: "nome@gmail.com" },
  { id: "outlook", label: "Outlook", icon: "O", color: "#8A3040", placeholder: "nome@outlook.com" },
  { id: "other",   label: "Altro",   icon: "✉", color: "#666",    placeholder: "nome@esempio.it" },
];

const Connections = () => {
  // Email accounts: multi-account list
  const [emailAccounts, setEmailAccounts] = useState([
    { uid: "ea1", provider: "gmail", email: "mario.rossi@gmail.com", lastSync: "2 min fa" },
  ]);

  // PEC / REM: single-account providers
  const [conns, setConns] = useState(CONNECTIONS.filter(c => !["gmail","outlook"].includes(c.id)));

  // Dialog state
  const [dialog, setDialog] = useState(null); // null | { mode: "email" } | { mode: "pec", c } | { mode: "confirm-remove-email", uid, email } | { mode: "confirm-disconnect", c }
  const [selProvider, setSelProvider] = useState("gmail");
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState("");

  const openEmailDialog = () => {
    setDialog({ mode: "email" });
    setSelProvider("gmail");
    setInputVal("");
    setInputError("");
  };

  const openPecDialog = (c) => {
    setDialog({ mode: "pec", c });
    setInputVal("");
    setInputError("");
  };

  const closeDialog = () => { setDialog(null); setInputVal(""); setInputError(""); };

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const confirmEmailConnect = () => {
    if (!inputVal.trim()) { setInputError("Inserisci un indirizzo email."); return; }
    if (!validateEmail(inputVal)) { setInputError("Indirizzo non valido."); return; }
    const prov = EMAIL_PROVIDERS.find(p => p.id === selProvider);
    setEmailAccounts(prev => [...prev, {
      uid: `ea${Date.now()}`, provider: selProvider,
      email: inputVal.trim(), lastSync: "Ora",
    }]);
    closeDialog();
  };

  const confirmPecConnect = () => {
    if (!inputVal.trim()) { setInputError("Inserisci un indirizzo email."); return; }
    if (!validateEmail(inputVal)) { setInputError("Indirizzo non valido."); return; }
    setConns(prev => prev.map(c => c.id === dialog.c.id
      ? { ...c, connected: true, email: inputVal.trim(), lastSync: "Ora" }
      : c
    ));
    closeDialog();
  };

  const removeEmailAccount = (uid) => setEmailAccounts(prev => prev.filter(a => a.uid !== uid));
  const disconnect = (id) => setConns(prev => prev.map(c => c.id === id ? { ...c, connected: false, email: null, lastSync: null } : c));

  const activeProv = EMAIL_PROVIDERS.find(p => p.id === selProvider);

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Connessioni e Canali</div>
          <div className="section-sub">Collega le tue caselle — accesso in sola lettura, mai modifiche</div>
        </div>
      </div>

      <div className="two-col" style={{ gridTemplateColumns: "1fr 280px" }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--text2)", background: "var(--red-soft)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="check" size={13} color="var(--red)" />
              <span>A-ESP accede ai tuoi canali in <strong>sola lettura</strong> via OAuth ufficiale. Non legge, non invia, non modifica nulla. L'accesso è revocabile in qualsiasi momento.</span>
            </div>
          </div>

          {/* EMAIL ORDINARIA */}
          <div style={{ marginBottom: 20 }}>
            <div className="nav-section" style={{ padding: "0 0 8px", color: "var(--text3)" }}>Email Ordinaria</div>

            {emailAccounts.map(acc => {
              const prov = EMAIL_PROVIDERS.find(p => p.id === acc.provider) || EMAIL_PROVIDERS[2];
              return (
                <div key={acc.uid} className="conn-card">
                  <div className="conn-icon" style={{ background: `${prov.color}20`, color: prov.color }}>{prov.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="conn-name">{prov.label}</div>
                    <div className="conn-email">{acc.email}</div>
                    <div className="conn-status" style={{ marginTop: 4 }}>
                      <div className="conn-dot" style={{ background: "var(--red-mid)" }} />
                      <span style={{ fontSize: 11, color: "var(--red-mid)" }}>Attiva</span>
                      <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 4 }}>· Ultima sync {acc.lastSync}</span>
                    </div>
                  </div>
                  <button className="conn-btn disconnect" onClick={() => setDialog({ mode: "confirm-remove-email", uid: acc.uid, email: acc.email })}>Rimuovi</button>
                </div>
              );
            })}

            <div className="conn-card" style={{ border: "1.5px dashed var(--border)", background: "transparent", cursor: "pointer" }}
              onClick={openEmailDialog}>
              <div className="conn-icon" style={{ background: "var(--red-soft)", color: "var(--red)", fontSize: 18, fontWeight: 300 }}>+</div>
              <div style={{ flex: 1 }}>
                <div className="conn-name" style={{ color: "var(--red)" }}>Aggiungi account email</div>
                <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 2 }}>Gmail, Outlook o qualsiasi provider IMAP</div>
              </div>
            </div>
          </div>

          {/* PEC + REM */}
          {[
            { section: "PEC (Italia)", items: ["pec_aruba", "pec_legalmail"] },
            { section: "REM / QeRDS (EU)", items: ["rem"] },
          ].map(({ section, items }) => (
            <div key={section} style={{ marginBottom: 20 }}>
              <div className="nav-section" style={{ padding: "0 0 8px", color: "var(--text3)" }}>{section}</div>
              {items.map(id => {
                const c = conns.find(x => x.id === id);
                return (
                  <div key={id} className="conn-card">
                    <div className="conn-icon" style={{ background: `${c.color}20`, color: c.color }}>{c.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="conn-name">{c.name}</div>
                      {c.connected && c.email ? (
                        <div className="conn-email">{c.email}</div>
                      ) : (
                        <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 2 }}>Non connessa</div>
                      )}
                      {c.connected && (
                        <div className="conn-status" style={{ marginTop: 4 }}>
                          <div className="conn-dot" style={{ background: "var(--red-mid)" }} />
                          <span style={{ fontSize: 11, color: "var(--red-mid)" }}>Attiva</span>
                          <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 4 }}>· Ultima sync {c.lastSync}</span>
                        </div>
                      )}
                    </div>
                    <button className={`conn-btn ${c.connected ? "disconnect" : "connect"}`} onClick={() => c.connected ? setDialog({ mode: "confirm-disconnect", c }) : openPecDialog(c)}>
                      {c.connected ? "Disconnetti" : "Connetti"}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <div className="widget">
            <div className="widget-title">Sicurezza & Privacy</div>
            {[["Sola lettura", "A-ESP non modifica né invia messaggi"], ["OAuth ufficiale", "Autenticazione tramite provider ufficiale"], ["Zero storage email", "I metadati, non il testo grezzo"], ["Revoca istantanea", "Disconnetti con un click"]].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--red-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={10} color="var(--red)" />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "var(--text2)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="widget">
            <div className="widget-title">Canali Prossimamente</div>
            {["WhatsApp Business", "Telegram", "Fattureincloud", "AdE – Cassetto Fiscale"].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5, color: "var(--text2)" }}>
                <Icon name="plus" size={11} color="var(--text3)" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONNECT / CONFIRM DIALOG */}
      {dialog && dialog.mode === "confirm-remove-email" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:360, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:22, marginBottom:12, textAlign:"center" }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", textAlign:"center", marginBottom:8 }}>Rimuovere questo account?</div>
            <div style={{ fontSize:12.5, color:"var(--text2)", textAlign:"center", marginBottom:20, lineHeight:1.5 }}>
              Stai per rimuovere il collegamento con<br />
              <strong style={{ color:"var(--text)" }}>{dialog.email}</strong>.<br />
              A-ESP non leggerà più questa casella.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeDialog}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={() => { removeEmailAccount(dialog.uid); closeDialog(); }}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Sì, rimuovi
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog && dialog.mode === "confirm-disconnect" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:360, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:22, marginBottom:12, textAlign:"center" }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", textAlign:"center", marginBottom:8 }}>Disconnettere {dialog.c.name}?</div>
            <div style={{ fontSize:12.5, color:"var(--text2)", textAlign:"center", marginBottom:20, lineHeight:1.5 }}>
              Stai per disconnettere<br />
              <strong style={{ color:"var(--text)" }}>{dialog.c.email}</strong>.<br />
              A-ESP non leggerà più questa casella.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeDialog}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={() => { disconnect(dialog.c.id); closeDialog(); }}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Sì, disconnetti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT DIALOG */}
      {dialog && (dialog.mode === "email" || dialog.mode === "pec") && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:400, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>

            {/* header */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:40, height:40, borderRadius:10,
                background: dialog.mode === "email" ? "var(--red-soft)" : `${dialog.c?.color}20`,
                color: dialog.mode === "email" ? "var(--red)" : dialog.c?.color,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800 }}>
                {dialog.mode === "email" ? "✉" : dialog.c?.icon}
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>
                  {dialog.mode === "email" ? "Aggiungi account email" : `Connetti ${dialog.c?.name}`}
                </div>
                <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:2 }}>Accesso in sola lettura via OAuth</div>
              </div>
              <button onClick={closeDialog} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer",
                color:"var(--text3)", fontSize:20, lineHeight:1, padding:4 }}>×</button>
            </div>

            {/* provider selector — only for email mode */}
            {dialog.mode === "email" && (
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text2)", display:"block", marginBottom:8 }}>Provider</label>
                <div style={{ display:"flex", gap:8 }}>
                  {EMAIL_PROVIDERS.map(p => (
                    <button key={p.id} onClick={() => { setSelProvider(p.id); setInputVal(""); setInputError(""); }}
                      style={{ flex:1, padding:"8px 6px", borderRadius:8, cursor:"pointer", fontFamily:"var(--font)",
                        fontSize:12.5, fontWeight:600, transition:"all 0.14s",
                        background: selProvider === p.id ? p.color : "var(--surface)",
                        color: selProvider === p.id ? "#FEFAEF" : "var(--text2)",
                        border: `1.5px solid ${selProvider === p.id ? p.color : "var(--border)"}` }}>
                      <span style={{ display:"block", fontSize:15, marginBottom:2 }}>{p.icon}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* email input */}
            <div style={{ marginBottom:6 }}>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text2)", display:"block", marginBottom:6 }}>
                Indirizzo email
              </label>
              <input
                autoFocus
                type="email"
                value={inputVal}
                onChange={e => { setInputVal(e.target.value); setInputError(""); }}
                onKeyDown={e => e.key === "Enter" && (dialog.mode === "email" ? confirmEmailConnect() : confirmPecConnect())}
                placeholder={dialog.mode === "email" ? (activeProv?.placeholder || "nome@esempio.it") : (dialog.c?.id === "pec_aruba" ? "nome@pec.it" : dialog.c?.id === "pec_legalmail" ? "nome@legalmail.it" : "nome@rem-provider.eu")}
                style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", borderRadius:8,
                  border:`1.5px solid ${inputError ? "var(--red)" : "var(--border)"}`,
                  background:"var(--surface)", color:"var(--text)", fontSize:13.5,
                  fontFamily:"var(--font)", outline:"none", transition:"border-color 0.15s" }}
              />
              {inputError && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5 }}>{inputError}</div>}
            </div>

            <div style={{ fontSize:11, color:"var(--text3)", marginBottom:20, lineHeight:1.5 }}>
              A-ESP richiederà l'autorizzazione OAuth al provider. Non memorizziamo password.
            </div>

            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={closeDialog}
                style={{ padding:"8px 16px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={dialog.mode === "email" ? confirmEmailConnect : confirmPecConnect}
                style={{ padding:"8px 18px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Connetti →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ─────────────────────────────────────────────
   NOTIFICATION PANEL
───────────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: 1, type: "urgent", read: false,
    title: "Scadenza critica — 3 giorni",
    sub: "Cartella esattoriale n. 0002348: importo € 890,00. Scade il 05/03/2026.",
    doc: 3, time: "Adesso", channel: "PEC"
  },
  {
    id: 2, type: "urgent", read: false,
    title: "Atto giudiziario ricevuto",
    sub: "Tribunale di Milano — atto di citazione procedimento 2026/1234. Risposta richiesta entro 05/03.",
    doc: 5, time: "2 ore fa", channel: "REM"
  },
  {
    id: 3, type: "deadline", read: false,
    title: "Avviso di accertamento — 12 giorni",
    sub: "Agenzia delle Entrate: accertamento n. 2025/47281 per € 2.450,00. Scade 10/03/2026.",
    doc: 1, time: "Ieri", channel: "PEC"
  },
  {
    id: 4, type: "deadline", read: true,
    title: "Polizza RC Auto in scadenza — 2 giorni",
    sub: "Generali Assicurazioni: rinnovo polizza entro 28/02/2026. Importo € 780,00.",
    doc: 7, time: "Ieri", channel: "EMAIL"
  },
  {
    id: 5, type: "info", read: true,
    title: "Nuova fattura archiviata",
    sub: "Stripe Payments — fattura febbraio 2026 ricevuta e classificata come C04.",
    doc: 11, time: "2 giorni fa", channel: "EMAIL"
  },
  {
    id: 6, type: "deadline", read: false,
    title: "Richiesta integrazione documentale",
    sub: "Camera di Commercio: pratica 88/2026 — integrazione entro 12/03/2026.",
    doc: 8, time: "3 giorni fa", channel: "PEC"
  },
  {
    id: 7, type: "info", read: true,
    title: "Convocazione assemblea — 17 giorni",
    sub: "Ordine dei Commercialisti: assemblea ordinaria 15 marzo 2026.",
    doc: 4, time: "4 giorni fa", channel: "EMAIL"
  },
  {
    id: 8, type: "ai", read: true,
    title: "A-ESP AI — Analisi completata",
    sub: "12 documenti analizzati, 4 urgenti rilevati, 3 scadenze entro 7 giorni.",
    doc: null, time: "Oggi 08:01", channel: null
  },
  {
    id: 9, type: "info", read: true,
    title: "Contributi INPS — comunicazione ricevuta",
    sub: "INPS: avviso contributi previdenziali € 1.120,00. Scadenza 20/03/2026.",
    doc: 12, time: "5 giorni fa", channel: "REM"
  },
];

const NotifIcon = ({ type, channel }) => {
  const configs = {
    urgent:   { bg: "var(--red-soft)",  border: "var(--border2)", icon: "warning", color: "var(--red)"     },
    deadline: { bg: "var(--red-pale)",  border: "var(--border)",  icon: "calendar",color: "var(--red-mid)" },
    info:     { bg: "var(--surface)",   border: "var(--border)",  icon: "doc",     color: "var(--text2)"   },
    ai:       { bg: "var(--red-soft)",  border: "var(--border2)", icon: "ai",      color: "var(--red)"     },
  };
  const c = configs[type] || configs.info;
  return (
    <div className="notif-icon-wrap" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <Icon name={c.icon} size={15} color={c.color} />
    </div>
  );
};

const NotificationPanel = ({ onClose, onDocClick }) => {
  const [tab, setTab] = useState("all");
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const filtered = tab === "all"    ? notifs
                 : tab === "unread" ? notifs.filter(n => !n.read)
                 : tab === "urgent" ? notifs.filter(n => n.type === "urgent" || n.type === "deadline")
                 : notifs;

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const handleNotifClick = (n) => {
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
    if (n.doc !== null) {
      const doc = MOCK_DOCS.find(d => d.id === n.doc);
      if (doc) { onDocClick(doc); onClose(); }
    }
  };

  // Group by time bucket
  const now      = filtered.filter(n => n.time === "Adesso" || n.time.includes("ore"));
  const today    = filtered.filter(n => n.time === "Ieri" || n.time.includes("Oggi"));
  const older    = filtered.filter(n => n.time.includes("giorni") || n.time.includes("settimana"));

  const renderGroup = (items, label) => {
    if (!items.length) return null;
    return (
      <>
        <div className="notif-separator">{label}</div>
        {items.map(n => (
          <div key={n.id} className={`notif-item${!n.read ? " unread" : ""}`} onClick={() => handleNotifClick(n)}>
            {!n.read && <div className="notif-unread-indicator" />}
            <NotifIcon type={n.type} channel={n.channel} />
            <div className="notif-body">
              <div className="notif-item-title">{n.title}</div>
              <div className="notif-item-sub">{n.sub}</div>
              <div className="notif-item-meta">
                {n.channel && (
                  <span style={{
                    fontSize:10, fontWeight:700, padding:"1px 5px", borderRadius:4,
                    fontFamily:"var(--mono)", letterSpacing:"0.3px",
                    background: n.channel==="PEC" ? "rgba(224,40,52,0.12)" : n.channel==="REM" ? "rgba(74,12,16,0.10)" : "rgba(122,20,24,0.10)",
                    color:      n.channel==="PEC" ? "var(--red)"           : n.channel==="REM" ? "var(--blue)"         : "var(--teal)",
                  }}>{n.channel}</span>
                )}
                {n.type === "ai" && (
                  <span style={{ fontSize:10, fontWeight:700, padding:"1px 5px", borderRadius:4,
                    background:"var(--red-soft)", color:"var(--red)", fontFamily:"var(--mono)" }}>AI</span>
                )}
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div className="notif-panel">
        <div className="notif-header">
          <div className="notif-header-left">
            <div className="notif-header-title">Notifiche</div>
            {unreadCount > 0 && <span className="notif-count-badge">{unreadCount}</span>}
          </div>
          <button className="notif-close-btn" onClick={onClose}>
            <Icon name="close" size={12} />
          </button>
        </div>

        <div className="notif-tabs">
          {[["all","Tutte"], ["unread","Non lette"], ["urgent","Urgenti"]].map(([key, label]) => (
            <div key={key} className={`notif-tab${tab===key?" active":""}`} onClick={() => setTab(key)}>
              {label}
              {key==="unread" && unreadCount > 0 && (
                <span style={{ marginLeft:5, background:"var(--red)", color:"#FEFAEF",
                  borderRadius:8, fontSize:9, fontWeight:800, padding:"1px 5px" }}>
                  {unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="notif-list">
          {filtered.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">🔔</div>
              <div className="notif-empty-text">Nessuna notifica in questa categoria</div>
            </div>
          ) : (
            <>
              {renderGroup(now,   "Recenti")}
              {renderGroup(today, "Oggi")}
              {renderGroup(older, "Precedenti")}
            </>
          )}
        </div>

        <div className="notif-footer">
          <button className="notif-footer-btn" onClick={markAllRead}>
            Segna tutte come lette
          </button>
          <button className="notif-footer-btn" style={{ color:"var(--text2)" }}>
            Impostazioni notifiche →
          </button>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   CALENDAR PAGE
───────────────────────────────────────────── */
const MONTHS_IT = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const DAYS_IT   = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];

const CalendarPage = ({ onDocClick }) => {
  const today = new Date(2026, 1, 26); // Feb 26 2026 (prototype date)
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1));
  const [selectedDay, setSelectedDay] = useState(today);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Build calendar grid (always 6 rows × 7 cols)
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const cells = [];
  // Prev month tail
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ d: new Date(year, month - 1, daysInPrev - i), cur: false });
  // Current month
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ d: new Date(year, month, i), cur: true });
  // Next month head
  while (cells.length < 42)
    cells.push({ d: new Date(year, month + 1, cells.length - firstDay - daysInMonth + 1), cur: false });

  // Map deadlines to dates
  const deadlineMap = {};
  MOCK_DOCS.forEach(doc => {
    if (!doc.deadline) return;
    const key = doc.deadline; // "YYYY-MM-DD"
    if (!deadlineMap[key]) deadlineMap[key] = [];
    deadlineMap[key].push(doc);
  });

  const cellKey = (d) => {
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isToday = (d) => isSameDay(d, today);

  const selKey = cellKey(selectedDay);
  const selectedDocs = deadlineMap[selKey] || [];

  // Colour by urgency
  const docColor = (doc) => {
    const d = daysUntil(doc.deadline);
    if (d !== null && d <= 7)  return "var(--red)";
    if (d !== null && d <= 21) return "var(--red-mid)";
    return "var(--teal)";
  };

  // Summary stats
  const upcomingDocs = MOCK_DOCS.filter(d => {
    if (!d.deadline) return false;
    const days = daysUntil(d.deadline);
    return days !== null && days >= 0 && days <= 30;
  });
  const overdueCount = MOCK_DOCS.filter(d => d.deadline && daysUntil(d.deadline) < 0).length;

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday   = () => { setViewDate(new Date(2026,1,1)); setSelectedDay(today); };

  const formatDateLabel = (d) => {
    const days = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
    return `${days[d.getDay()]} ${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="fade-in">
      <div className="section-hdr" style={{ marginBottom: 18 }}>
        <div>
          <div className="section-title">Calendario Scadenze</div>
          <div className="section-sub">Tutte le scadenze rilevate da A-ESP — clicca su un giorno per i dettagli</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div className="ai-chip"><span className="ai-dot"/>AI attiva</div>
          <button className="cal-today-btn" onClick={goToday}>Oggi</button>
        </div>
      </div>

      <div className="cal-wrap">
        {/* LEFT: CALENDAR */}
        <div className="cal-main">
          <div className="cal-header">
            <button className="cal-nav-btn" onClick={prevMonth}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="cal-month-label">{MONTHS_IT[month]} {year}</div>
            <button className="cal-nav-btn" onClick={nextMonth}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="cal-weekdays">
            {DAYS_IT.map((d, i) => (
              <div key={d} className={`cal-weekday${i===0||i===6?" weekend":""}`}>{d}</div>
            ))}
          </div>

          <div className="cal-grid">
            {cells.map((cell, idx) => {
              const key  = cellKey(cell.d);
              const docs = deadlineMap[key] || [];
              const isSel = isSameDay(cell.d, selectedDay);
              const isTod = isToday(cell.d);
              const isWk  = cell.d.getDay() === 0 || cell.d.getDay() === 6;

              return (
                <div
                  key={idx}
                  className={`cal-cell${!cell.cur?" other-month":""}${isTod?" today":""}${isSel&&!isTod?" selected":""}`}
                  onClick={() => setSelectedDay(cell.d)}
                >
                  <div className="cal-day-num" style={isWk&&!isTod?{color:"var(--red-mid)"}:{}}>
                    {cell.d.getDate()}
                  </div>
                  {docs.length > 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                      {docs.slice(0,3).map(doc => {
                        const cat = getCategoryInfo(doc.category);
                        const col = docColor(doc);
                        return (
                          <span
                            key={doc.id}
                            className="cal-event-pill"
                            style={{ background:`${col}18`, color:col, border:`1px solid ${col}40` }}
                            onClick={e => { e.stopPropagation(); onDocClick(doc); }}
                            title={doc.subject}
                          >
                            {doc.from.split(" ")[0]}
                          </span>
                        );
                      })}
                      {docs.length > 3 && (
                        <span style={{ fontSize:9, color:"var(--text3)", fontWeight:600, paddingLeft:4 }}>
                          +{docs.length - 3} altri
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: PANELS */}
        <div className="cal-side">
          {/* SUMMARY */}
          <div className="cal-summary-card">
            <div className="cal-summary-title">Riepilogo mese</div>
            <div className="cal-summary-row">
              <span>Scadenze totali ({MONTHS_IT[month]})</span>
              <span style={{ fontWeight:700, color:"var(--text)" }}>
                {Object.entries(deadlineMap).filter(([k])=> k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`)).reduce((s,[,v])=>s+v.length,0)}
              </span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--red)" }}>Urgenti (entro 7gg)</span>
              <span style={{ fontWeight:700, color:"var(--red)" }}>
                {MOCK_DOCS.filter(d => d.deadline && daysUntil(d.deadline) !== null && daysUntil(d.deadline) >= 0 && daysUntil(d.deadline) <= 7).length}
              </span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--red-mid)" }}>In scadenza (30gg)</span>
              <span style={{ fontWeight:700, color:"var(--red-mid)" }}>{upcomingDocs.length}</span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--text3)" }}>Già scadute</span>
              <span style={{ fontWeight:700, color:"var(--text3)" }}>{overdueCount}</span>
            </div>
          </div>

          {/* DAY DETAIL */}
          <div className="cal-day-panel">
            <div className="cal-day-panel-header">
              <div className="cal-day-title">{formatDateLabel(selectedDay)}</div>
              <div className="cal-day-sub">
                {selectedDocs.length === 0
                  ? "Nessuna scadenza questo giorno"
                  : `${selectedDocs.length} scadenza${selectedDocs.length > 1 ? "e" : ""} rilevata${selectedDocs.length > 1 ? "e" : ""} da A-ESP`}
              </div>
            </div>
            <div className="cal-day-events">
              {selectedDocs.length === 0 ? (
                <div style={{ padding:"28px 0", textAlign:"center" }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>📅</div>
                  <div style={{ fontSize:12.5, color:"var(--text3)" }}>Nessuna scadenza</div>
                  <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:4 }}>Seleziona un giorno con eventi</div>
                </div>
              ) : (
                selectedDocs.map(doc => {
                  const cat = getCategoryInfo(doc.category);
                  const col = docColor(doc);
                  const d   = daysUntil(doc.deadline);
                  return (
                    <div
                      key={doc.id}
                      className="cal-event-item"
                      style={{ borderLeftColor: col }}
                      onClick={() => onDocClick(doc)}
                    >
                      <div className="cal-event-from">{doc.channel} · {doc.from}</div>
                      <div className="cal-event-subject">{doc.subject}</div>
                      <div className="cal-event-meta">
                        
                        {doc.amount && (
                          <span style={{ fontSize:11.5, fontWeight:700, color:col, fontFamily:"var(--mono)" }}>{doc.amount}</span>
                        )}
                        {d !== null && (
                          <span style={{ fontSize:11, color:col, marginLeft:"auto", fontWeight:700 }}>
                            {d === 0 ? "Scade oggi" : d < 0 ? `Scaduto ${Math.abs(d)}gg fa` : `Tra ${d} giorni`}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* LEGEND */}
          <div className="cal-summary-card">
            <div className="cal-summary-title">Legenda</div>
            {[
              ["var(--red)",     "Urgente — entro 7 giorni"],
              ["var(--red-mid)", "In scadenza — entro 21 giorni"],
              ["var(--teal)",    "Prossimamente — oltre 21 giorni"],
            ].map(([col, label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 0" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:col, flexShrink:0 }}/>
                <span style={{ fontSize:12, color:"var(--text2)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   NEW CATEGORY WIZARD
───────────────────────────────────────────── */
const RISK_OPTIONS = [
  { value:"alto",       label:"Alto",       desc:"Conseguenze legali/economiche gravi se ignorato" },
  { value:"medio-alto", label:"Medio-Alto", desc:"Richiede attenzione entro breve termine" },
  { value:"medio",      label:"Medio",      desc:"Da gestire con regolarità" },
  { value:"basso-medio",label:"Basso-Medio",desc:"Rilevante ma non urgente" },
  { value:"basso",      label:"Basso",      desc:"Informativo, nessun obbligo diretto" },
];
const RISK_COLORS = {
  "alto":"#E42733","medio-alto":"#C03040","medio":"#D06070","basso-medio":"#B07080","basso":"#C09098"
};

const WIZARD_STEPS = [
  { id:"name",     title:"Nome della categoria",       emoji:"🏷️"  },
  { id:"desc",     title:"Descrizione e scopo",        emoji:"📝"  },
  { id:"keywords", title:"Parole chiave identificative",emoji:"🔑"  },
  { id:"risk",     title:"Livello di rischio",         emoji:"⚠️"  },
  { id:"examples", title:"Esempi di documenti",        emoji:"📄"  },
  { id:"confirm",  title:"Riepilogo — conferma",       emoji:"✅"  },
];

const NewCategoryModal = ({ onClose, onConfirm, existingCodes }) => {
  const [step,     setStep]     = useState(0);
  const [form,     setForm]     = useState({ name:"", desc:"", keywords:"", risk:"medio", examples:"" });
  const [error,    setError]    = useState("");
  const [thinking, setThinking] = useState(false);

  // AI keyword suggestions
  const [aiSuggestions,     setAiSuggestions]     = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [selectedChips,     setSelectedChips]     = useState(new Set());

  // AI example suggestions (step 4)
  const [aiExamples,        setAiExamples]        = useState([]);
  const [examplesLoading,   setExamplesLoading]   = useState(false);
  const [selectedExamples,  setSelectedExamples]  = useState(new Set());

  const current = WIZARD_STEPS[step];
  const isLast  = step === WIZARD_STEPS.length - 1;

  const set = (k, v) => { setForm(f => ({ ...f, [k]:v })); setError(""); };

  // fetch AI keyword suggestions via Anthropic API
  const fetchSuggestions = async (name, desc) => {
    setSuggestionsLoading(true);
    setAiSuggestions([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: "Sei un assistente specializzato nella classificazione documentale italiana. Rispondi SOLO con un JSON valido, senza markdown, senza backtick, senza testo aggiuntivo.",
          messages: [{
            role: "user",
            content: `Categoria: "${name}"${desc ? `\nDescrizione: "${desc}"` : ""}\n\nGenera esattamente 14 parole chiave italiane (sostantivi o brevi frasi di 1-3 parole) utili per riconoscere automaticamente documenti di questa categoria in email, PEC e allegati. Rispondi SOLO con questo JSON: {"keywords":["kw1","kw2",...]}`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed.keywords)) {
        const kws = parsed.keywords.slice(0, 14);
        setAiSuggestions(kws);
        setForm(f => ({ ...f, keywords: f.keywords.trim() ? f.keywords : kws.join(", ") }));
      }
    } catch(e) {
      console.error("suggestions error", e, data);
      setAiSuggestions([]);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // toggle chip: add/remove from keywords textarea
  const toggleChip = (kw) => {
    const newSelected = new Set(selectedChips);
    if (newSelected.has(kw)) {
      newSelected.delete(kw);
      // remove from textarea
      const updated = form.keywords.split(/[,;\n]+/)
        .map(k => k.trim()).filter(k => k && k !== kw).join(", ");
      set("keywords", updated);
    } else {
      newSelected.add(kw);
      // append to textarea
      const current = form.keywords.trim();
      set("keywords", current ? current + ", " + kw : kw);
    }
    setSelectedChips(newSelected);
  };

  const fetchExamples = async (name, desc, keywords) => {
    setExamplesLoading(true);
    setAiExamples([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 350,
          system: "Sei un assistente specializzato nella classificazione documentale italiana. Rispondi SOLO con un JSON valido, senza markdown, senza backtick, senza testo aggiuntivo.",
          messages: [{
            role: "user",
            content: `Categoria: "${name}"${desc ? `\nDescrizione: "${desc}"` : ""}${keywords ? `\nParole chiave: ${keywords}` : ""}\n\nGenera esattamente 10 esempi concreti e realistici di documenti italiani che appartengono a questa categoria. Ogni esempio deve essere una breve frase nominale di 4-8 parole (es. "Referto visita cardiologica del 10/01/2026"). Rispondi SOLO con: {"examples":["esempio1","esempio2",...]}`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (Array.isArray(parsed.examples)) {
        const exs = parsed.examples.slice(0, 10);
        setAiExamples(exs);
        setForm(f => ({ ...f, examples: f.examples.trim() ? f.examples : exs.join("\n") }));
      }
    } catch(e) {
      console.error("examples error", e, data);
      setAiExamples([]);
    } finally {
      setExamplesLoading(false);
    }
  };

  const toggleExample = (ex) => {
    const newSelected = new Set(selectedExamples);
    if (newSelected.has(ex)) {
      newSelected.delete(ex);
      const updated = form.examples.split("\n").map(k => k.trim()).filter(k => k && k !== ex).join("\n");
      set("examples", updated);
    } else {
      newSelected.add(ex);
      const cur = form.examples.trim();
      set("examples", cur ? cur + "\n" + ex : ex);
    }
    setSelectedExamples(newSelected);
  };

  const validate = () => {
    if (step === 0 && !form.name.trim())     return "Inserisci un nome per la categoria.";
    if (step === 0 && form.name.trim().length < 3) return "Il nome deve essere di almeno 3 caratteri.";
    if (step === 1 && !form.desc.trim())     return "Aggiungi una breve descrizione.";
    if (step === 2 && !form.keywords.trim()) return "Inserisci almeno una parola chiave.";
    if (step === 4 && !form.examples.trim()) return "Inserisci almeno un esempio.";
    return "";
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    if (step < WIZARD_STEPS.length - 2) {
      const nextStep = step + 1;
      setStep(nextStep);
      setError("");
      // trigger AI suggestions when entering keywords step
      if (nextStep === 2) fetchSuggestions(form.name, form.desc);
      if (nextStep === 4) fetchExamples(form.name, form.desc, form.keywords);
      return;
    }
    // step 4 → step 5 (confirm): simulate AI processing
    setThinking(true);
    setTimeout(() => { setThinking(false); setStep(5); }, 1600);
  };

  const confirm = () => {
    const nextIdx = existingCodes.length + 1;
    const code    = "CC" + String(nextIdx).padStart(2, "0");
    const color   = RISK_COLORS[form.risk] || "#D06070";
    onConfirm({
      code,
      label:    form.name.trim(),
      risk:     form.risk,
      color,
      custom:   true,
      keywords: form.keywords.split(/[,;\n]+/).map(k => k.trim().toLowerCase()).filter(Boolean),
      desc:     form.desc.trim(),
      examples: form.examples.trim(),
    });
    onClose();
  };

  const riskInfo = RISK_OPTIONS.find(r => r.value === form.risk);

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.52)", zIndex:400,
      display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:20,
        padding:"30px 28px 26px", width:480, boxShadow:"0 24px 64px rgba(224,40,52,0.20)", position:"relative" }}
        onClick={e => e.stopPropagation()}>

        {/* step progress */}
        <div style={{ display:"flex", gap:4, marginBottom:22 }}>
          {WIZARD_STEPS.map((s,i) => (
            <div key={s.id} style={{ flex:1, height:3, borderRadius:4,
              background: i <= step ? "var(--red)" : "var(--border)",
              transition:"background 0.25s" }} />
          ))}
        </div>

        {/* header */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:"var(--red-soft)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>
            {thinking ? "🤖" : current.emoji}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"var(--red)", letterSpacing:"0.6px",
              textTransform:"uppercase", marginBottom:2 }}>
              Passo {step + 1} di {WIZARD_STEPS.length}
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>
              {thinking ? "L'agente IA sta elaborando…" : current.title}
            </div>
          </div>
          {!thinking && (
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", fontSize:22, lineHeight:1, padding:4 }}>×</button>
          )}
        </div>

        {/* ── THINKING ANIMATION ── */}
        {thinking && (
          <div style={{ textAlign:"center", padding:"24px 0 32px" }}>
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:18 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:"var(--red)",
                  animation:`bounce 0.9s ${i*0.2}s infinite alternate`,
                  animationTimingFunction:"ease-in-out" }} />
              ))}
            </div>
            <div style={{ fontSize:13, color:"var(--text2)" }}>
              Analisi delle parole chiave e configurazione<br />del cassetto personalizzato…
            </div>
            <style>{`@keyframes bounce { from{transform:translateY(0)} to{transform:translateY(-10px)} }`}</style>
          </div>
        )}

        {/* ── STEP BODIES ── */}
        {!thinking && step === 0 && (
          <div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:10 }}>
              Dai un nome chiaro alla tua categoria. Sarà visibile nell'archivio e usato dall'agente IA per il riconoscimento automatico.
            </div>
            <input value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="es. Documentazione medica, Pratiche condominiali…"
              style={{ width:"100%", padding:"11px 14px", borderRadius:9,
                border:`1.5px solid ${error ? "#E02834" : "var(--border)"}`,
                background:"var(--surface)", color:"var(--text)", fontSize:13.5,
                fontFamily:"var(--font)", outline:"none", boxSizing:"border-box" }}
              onKeyDown={e => e.key === "Enter" && next()}
              autoFocus />
          </div>
        )}

        {!thinking && step === 1 && (
          <div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:10 }}>
              Descrivi brevemente che tipo di documenti devono finire in questo cassetto. L'agente IA userà questa descrizione per migliorare la classificazione.
            </div>
            <textarea value={form.desc} onChange={e => set("desc", e.target.value)}
              placeholder="es. Documenti relativi a visite mediche, referti, prescrizioni, ricoveri e spese sanitarie personali o familiari."
              rows={4}
              style={{ width:"100%", padding:"11px 14px", borderRadius:9,
                border:`1.5px solid ${error ? "#E02834" : "var(--border)"}`,
                background:"var(--surface)", color:"var(--text)", fontSize:13,
                fontFamily:"var(--font)", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
        )}

        {!thinking && step === 2 && (
          <div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:12 }}>
              L'agente IA ha generato le parole chiave in base al nome e alla descrizione della categoria. Modificale o aggiungine di nuove direttamente nel campo sottostante.
            </div>

            {/* LOADING STATE */}
            {suggestionsLoading && (
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12,
                padding:"10px 14px", borderRadius:8, background:"var(--red-soft)",
                border:"1px solid rgba(224,40,52,0.2)" }}>
                <span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%",
                  border:"2px solid var(--red)", borderTopColor:"transparent",
                  animation:"spin 0.7s linear infinite", flexShrink:0 }} />
                <span style={{ fontSize:12, color:"var(--red)", fontWeight:600 }}>
                  🤖 L'agente IA sta generando le parole chiave…
                </span>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>
            )}

            {/* TEXTAREA */}
            <textarea value={form.keywords} onChange={e => set("keywords", e.target.value)}
              placeholder={suggestionsLoading ? "In attesa dei suggerimenti IA…" : "es. referto, visita, ricovero, prescrizione, medico, diagnosi…"}
              rows={4}
              style={{ width:"100%", padding:"11px 14px", borderRadius:9,
                border:`1.5px solid ${error ? "#E02834" : "var(--border)"}`,
                background:"var(--surface)", color:"var(--text)", fontSize:13,
                fontFamily:"var(--font)", outline:"none", resize:"vertical", boxSizing:"border-box" }} />

            {/* ACTIVE KEYWORDS PREVIEW */}
            {form.keywords.trim() && (
              <div style={{ marginTop:8 }}>
                <div style={{ fontSize:10.5, color:"var(--text3)", fontWeight:700, marginBottom:5,
                  textTransform:"uppercase", letterSpacing:"0.5px" }}>Parole chiave attive</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {form.keywords.split(/[,;\n]+/).filter(k => k.trim()).map((k,i) => (
                    <span key={i} style={{ fontSize:11, background:"var(--red-soft)", color:"var(--red)",
                      padding:"3px 10px", borderRadius:10, fontWeight:600 }}>{k.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!thinking && step === 3 && (
          <div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:12 }}>
              Seleziona il livello di rischio associato a questa categoria. Determina la priorità degli avvisi generati dall'agente IA.
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {RISK_OPTIONS.map(opt => (
                <div key={opt.value}
                  onClick={() => set("risk", opt.value)}
                  style={{ padding:"11px 14px", borderRadius:9, cursor:"pointer",
                    border:`2px solid ${form.risk === opt.value ? RISK_COLORS[opt.value] : "var(--border)"}`,
                    background: form.risk === opt.value ? `${RISK_COLORS[opt.value]}12` : "var(--surface)",
                    transition:"all 0.14s", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", flexShrink:0,
                    background: form.risk === opt.value ? RISK_COLORS[opt.value] : "var(--border)" }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700,
                      color: form.risk === opt.value ? RISK_COLORS[opt.value] : "var(--text)" }}>{opt.label}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", marginTop:1 }}>{opt.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!thinking && step === 4 && (
          <div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:12 }}>
              L'agente IA ha generato esempi concreti di documenti per questa categoria. Modificali o aggiungine di nuovi direttamente nel campo sottostante.
            </div>

            {/* LOADING STATE */}
            {examplesLoading && (
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12,
                padding:"10px 14px", borderRadius:8, background:"var(--red-soft)",
                border:"1px solid rgba(224,40,52,0.2)" }}>
                <span style={{ display:"inline-block", width:12, height:12, borderRadius:"50%",
                  border:"2px solid var(--red)", borderTopColor:"transparent",
                  animation:"spin 0.7s linear infinite", flexShrink:0 }} />
                <span style={{ fontSize:12, color:"var(--red)", fontWeight:600 }}>
                  🤖 L'agente IA sta generando gli esempi…
                </span>
              </div>
            )}

            {/* TEXTAREA */}
            <textarea value={form.examples} onChange={e => set("examples", e.target.value)}
              placeholder={examplesLoading ? "In attesa dei suggerimenti IA…" : "es. Referto visita cardiologica del 10/01/2026"}
              rows={6}
              style={{ width:"100%", padding:"11px 14px", borderRadius:9,
                border:`1.5px solid ${error ? "#E02834" : "var(--border)"}`,
                background:"var(--surface)", color:"var(--text)", fontSize:13,
                fontFamily:"var(--font)", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
          </div>
        )}

        {/* ── CONFIRM STEP ── */}
        {!thinking && step === 5 && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ background:"var(--surface)", borderRadius:10, padding:"14px 16px",
              border:`1.5px solid ${RISK_COLORS[form.risk]}40` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:9, display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:18, background:`${RISK_COLORS[form.risk]}18` }}>🗂️</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"var(--text)" }}>{form.name}</div>
                  <span style={{ fontSize:10.5, fontWeight:700, color:RISK_COLORS[form.risk],
                    background:`${RISK_COLORS[form.risk]}18`, padding:"1px 8px", borderRadius:6 }}>
                    rischio {form.risk}
                  </span>
                </div>
              </div>
              <div style={{ fontSize:12, color:"var(--text2)", marginBottom:8 }}>{form.desc}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {form.keywords.split(/[,;\n]+/).filter(k => k.trim()).map((k,i) => (
                  <span key={i} style={{ fontSize:11, background:"var(--red-soft)", color:"var(--red)",
                    padding:"1px 8px", borderRadius:8, fontWeight:600 }}>{k.trim()}</span>
                ))}
              </div>
            </div>
            <div style={{ background:"var(--surface)", borderRadius:10, padding:"12px 14px",
              border:"1px solid var(--border)" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
                letterSpacing:"0.5px", marginBottom:6 }}>🤖 Agente IA configurato</div>
              <div style={{ fontSize:12, color:"var(--text2)", lineHeight:1.6 }}>
                L'agente utilizzerà <strong>nome</strong>, <strong>descrizione</strong>, <strong>parole chiave</strong> ed <strong>esempi</strong> per classificare automaticamente i documenti in questo cassetto durante l'analisi dei flussi email, PEC e REM, e nei caricamenti manuali.
              </div>
            </div>
          </div>
        )}

        {/* error */}
        {error && !thinking && (
          <div style={{ marginTop:10, fontSize:12, color:"#E02834", fontWeight:600 }}>⚠ {error}</div>
        )}

        {/* footer buttons */}
        {!thinking && (
          <div style={{ display:"flex", gap:10, marginTop:22 }}>
            {step > 0 && step < 5 && (
              <button onClick={() => setStep(s => s - 1)}
                style={{ padding:"10px 18px", borderRadius:8, border:"1px solid var(--border)",
                  background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)" }}>← Indietro</button>
            )}
            {step === 0 && (
              <button onClick={onClose}
                style={{ padding:"10px 18px", borderRadius:8, border:"1px solid var(--border)",
                  background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                  cursor:"pointer", fontFamily:"var(--font)" }}>Annulla</button>
            )}
            {step < 5 && (
              <button onClick={next}
                style={{ flex:1, padding:"10px", borderRadius:8, border:"none",
                  background:"var(--red)", color:"#FEFAEF", fontSize:13, fontWeight:700,
                  cursor:"pointer", fontFamily:"var(--font)" }}>
                {step === 4 ? "Crea cassetto →" : "Avanti →"}
              </button>
            )}
            {step === 5 && (
              <>
                <button onClick={() => setStep(4)}
                  style={{ padding:"10px 18px", borderRadius:8, border:"1px solid var(--border)",
                    background:"transparent", color:"var(--text2)", fontSize:13, fontWeight:600,
                    cursor:"pointer", fontFamily:"var(--font)" }}>← Modifica</button>
                <button onClick={confirm}
                  style={{ flex:1, padding:"10px", borderRadius:8, border:"none",
                    background:"var(--red)", color:"#FEFAEF", fontSize:13.5, fontWeight:700,
                    cursor:"pointer", fontFamily:"var(--font)" }}>
                  ✓ Aggiungi all'archivio
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SEARCH HELPERS
───────────────────────────────────────────── */
const highlightMatch = (text, query) => {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="search-highlight">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
};

const searchDocs = (allDocs, query, scopeCat = null) => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const pool = scopeCat ? allDocs.filter(d => d.category === scopeCat) : allDocs;
  return pool.filter(d =>
    d.subject.toLowerCase().includes(q) ||
    d.from.toLowerCase().includes(q) ||
    (d.amount && d.amount.toLowerCase().includes(q)) ||
    getCategoryInfo(d.category).label.toLowerCase().includes(q)
  ).slice(0, 7);
};

/* Global topbar search — receives allDocs + onSelect callback */
const GlobalSearch = ({ allDocs, onSelect }) => {
  const [query, setQuery]   = useState("");
  const [open, setOpen]     = useState(false);
  const wrapRef             = useRef(null);
  const results             = searchDocs(allDocs, query);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (doc) => {
    onSelect(doc);
    setQuery("");
    setOpen(false);
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div
      ref={wrapRef}
      className={"search-box" + (showDropdown ? " open" : "")}
    >
      <Icon name="search" size={13} color={showDropdown ? "var(--red)" : "var(--text3)"} />
      <input
        placeholder="Cerca in tutti i documenti..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => { if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
      />
      {query && (
        <span
          onClick={() => { setQuery(""); setOpen(false); }}
          style={{ cursor:"pointer", color:"var(--text3)", fontSize:16, lineHeight:1, flexShrink:0 }}>×</span>
      )}
      {showDropdown && (
        <div className="search-dropdown">
          {results.length === 0 ? (
            <div className="search-empty">Nessun documento trovato per "<strong>{query}</strong>"</div>
          ) : (
            results.map(doc => {
              const cat = getCategoryInfo(doc.category);
              return (
                <div key={doc.id} className="search-result-item" onClick={() => handleSelect(doc)}>
                  <ChannelTag channel={doc.channel} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div className="search-result-subject">{highlightMatch(doc.subject, query)}</div>
                    <div className="search-result-from">{highlightMatch(doc.from, query)}</div>
                  </div>
                  <span style={{ fontSize:10.5, fontWeight:600, color:cat.color, background:`${cat.color}18`,
                    padding:"2px 7px", borderRadius:5, flexShrink:0 }}>{cat.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

/* Cassetto-scoped search bar used inside CategoryLanding */
const CatSearch = ({ docs, onSelect }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const wrapRef           = useRef(null);
  const results           = searchDocs(docs, query);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (doc) => {
    onSelect(doc);
    setQuery("");
    setOpen(false);
  };

  const showDropdown = open && query.trim().length > 0;

  return (
    <div ref={wrapRef} className={"cat-search-wrap" + (showDropdown ? " open" : "")}>
      <Icon name="search" size={13} color={showDropdown ? "var(--red)" : "var(--text3)"} />
      <input
        placeholder="Cerca in questo cassetto…"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={e => { if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
      />
      {query && (
        <span onClick={() => { setQuery(""); setOpen(false); }}
          style={{ cursor:"pointer", color:"var(--text3)", fontSize:16, lineHeight:1, flexShrink:0 }}>×</span>
      )}
      <span className="search-scope-badge">solo cassetto</span>
      {showDropdown && (
        <div className="cat-search-dropdown">
          {results.length === 0 ? (
            <div className="search-empty">Nessun documento trovato per "<strong>{query}</strong>"</div>
          ) : (
            results.map(doc => (
              <div key={doc.id} className="search-result-item" onClick={() => handleSelect(doc)}>
                <ChannelTag channel={doc.channel} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="search-result-subject">{highlightMatch(doc.subject, query)}</div>
                  <div className="search-result-from">{highlightMatch(doc.from, query)}</div>
                </div>
                {doc.deadline && <DeadlineBadge deadline={doc.deadline} />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   SEGRETARIO AI
───────────────────────────────────────────── */
const SUGGESTED_PROMPTS = [
  "Quali documenti scadono entro i prossimi 7 giorni?",
  "Mostrami tutte le PEC non lette",
  "Quanto devo in totale tra fatture e tributi?",
  "Ci sono sanzioni o cartelle esattoriali in archivio?",
  "Riassumi la fattura Enel del mese scorso",
  "Quali documenti richiedono una mia azione urgente?",
];

const buildSystemPrompt = () => {
  const docList = MOCK_DOCS.map(d => {
    const cat = getCategoryInfo(d.category);
    return `- [ID:${d.id}] [${d.channel}] "${d.subject}" da ${d.from} — cat: ${cat.label} — data: ${d.date}${d.deadline ? ` — scadenza: ${d.deadline}` : ""}${d.amount ? ` — importo: ${d.amount}` : ""}${d.urgent ? " — URGENTE" : ""}${!d.read ? " — NON LETTO" : ""}${d.managed ? " — archiviato" : ""}`;
  }).join("\n");

  return `Sei il Segretario AI di A-ESP. Tono professionale ma caldo, in italiano.

Archivio di Mario Rossi (Piano Professional):
${docList}

RISPOSTA: restituisci SEMPRE e SOLO JSON valido senza markdown:
{"text":"risposta in italiano con **grassetto** per valori chiave","refs":["1","4","7"]}

"refs" = array degli ID numerici (es. "1","4","7") dei documenti citati. Array vuoto se non ne citi.
Regole: rispondi in modo umano e conciso. Includi SEMPRE refs per ogni documento che menzioni. Non inventare dati.`;
};

const SecretaryPage = ({ onDocClick, messages, setMessages }) => {
  const [input,    setInput]      = useState("");
  const [loading,  setLoading]    = useState(false);
  const [apiKey,   setApiKey]     = useState("");
  const [showKey,  setShowKey]    = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  const ts = () => new Date().toLocaleTimeString("it-IT", { hour:"2-digit", minute:"2-digit" });

  const send = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg = { role:"user", text: userText, ts: ts() };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    // Build messages array for the API (exclude system fields)
    const apiMessages = history.map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          system: buildSystemPrompt(),
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "{}";
      let reply = "Non sono riuscito a elaborare la risposta.";
      let refs  = [];
      try {
        const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
        reply = parsed.text || reply;
        refs  = (parsed.refs || []).map(id => {
          const clean = String(id).replace(/^ID:/i, "");
          return MOCK_DOCS.find(d => String(d.id) === clean);
        }).filter(Boolean);
      } catch {
        reply = raw; // fallback: show raw text if not valid JSON
      }
      setMessages(prev => [...prev, { role:"assistant", text: reply, refs, ts: ts() }]);
    } catch {
      setMessages(prev => [...prev, { role:"assistant", text: "Si è verificato un errore di connessione. Controlla la tua API key e riprova.", ts: ts(), error: true }]);
    }
    setLoading(false);
  };

  const handleKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // Render message text with basic **bold** support
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**")
        ? <strong key={i}>{p.slice(2,-2)}</strong>
        : <span key={i}>{p}</span>
    );
  };

  return (
    <div className="fade-in" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", gap:0 }}>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <div className="section-title" style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"var(--red)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon name="secretary" size={16} color="#FEFAEF" />
            </div>
            Segretario AI
          </div>
          <div className="section-sub">Fai domande sul tuo archivio in linguaggio naturale</div>
        </div>
        {/* API key toggle */}
        <button onClick={() => setShowKey(s => !s)}
          style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:8,
            padding:"6px 12px", cursor:"pointer", fontSize:11.5, fontWeight:600,
            color:"var(--text2)", fontFamily:"var(--font)", display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:12 }}>🔑</span> API key
        </button>
      </div>

      {showKey && (
        <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:10,
          padding:"12px 16px", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:11.5, color:"var(--text2)", fontWeight:600, whiteSpace:"nowrap" }}>Anthropic API key:</span>
          <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            style={{ flex:1, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:7,
              padding:"6px 10px", fontSize:12, fontFamily:"var(--mono)", color:"var(--text)",
              outline:"none" }} />
          <span style={{ fontSize:11, color:"var(--text3)" }}>Opzionale — solo browser</span>
        </div>
      )}

      {/* ── CHAT WINDOW ── */}
      <div style={{ flex:1, background:"var(--card)", border:"1px solid var(--border)", borderRadius:14,
        display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* messages */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", display:"flex",
          flexDirection:"column", gap:18 }}>

          {messages.map((m, i) => {
            const isAI = m.role === "assistant";
            return (
              <div key={i} style={{ display:"flex", gap:12,
                flexDirection: isAI ? "row" : "row-reverse" }}>
                {/* avatar */}
                <div style={{ width:34, height:34, borderRadius:10, flexShrink:0,
                  background: isAI ? "var(--red)" : "var(--surface)",
                  border: isAI ? "none" : "1px solid var(--border)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: isAI ? 0 : 12, fontWeight:700, color:"var(--text2)" }}>
                  {isAI
                    ? <Icon name="secretary" size={16} color="#FEFAEF" />
                    : "MR"}
                </div>
                {/* bubble */}
                <div style={{ maxWidth:"72%", display:"flex", flexDirection:"column",
                  alignItems: isAI ? "flex-start" : "flex-end", gap:4 }}>
                  <div style={{
                    background: isAI ? "var(--surface)" : "var(--red)",
                    border: isAI ? "1px solid var(--border)" : "none",
                    borderRadius: isAI ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    padding:"11px 15px", fontSize:13.5, lineHeight:1.6,
                    color: isAI ? "var(--text)" : "#FEFAEF",
                    boxShadow: isAI ? "none" : "0 2px 8px rgba(176,32,40,0.25)",
                    ...(m.error ? { borderColor:"var(--red)", background:"var(--red-soft)", color:"var(--red)" } : {})
                  }}>
                    {renderText(m.text)}
                  </div>
                  {/* doc reference chips */}
                  {isAI && m.refs && m.refs.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:4, maxWidth:"100%" }}>
                      {m.refs.map(doc => {
                        const cat = getCategoryInfo(doc.category);
                        return (
                          <button key={doc.id} onClick={() => onDocClick && onDocClick(doc)}
                            style={{
                              display:"flex", alignItems:"center", gap:7,
                              background:"var(--card)", border:"1px solid var(--border)",
                              borderLeft:`3px solid ${cat.color}`,
                              borderRadius:8, padding:"6px 11px",
                              cursor:"pointer", fontFamily:"var(--font)",
                              transition:"all 0.15s", textAlign:"left",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.background = `${cat.color}10`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.borderLeftColor = cat.color; e.currentTarget.style.background = "var(--card)"; }}
                          >
                            <ChannelTag channel={doc.channel} />
                            <div>
                              <div style={{ fontSize:11.5, fontWeight:700, color:"var(--text)", maxWidth:220,
                                overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                                {doc.subject}
                              </div>
                              <div style={{ fontSize:10.5, color:"var(--text3)", marginTop:1 }}>
                                {doc.from} · {doc.date}
                                {doc.deadline && <span style={{ marginLeft:5, color: daysUntil(doc.deadline) !== null && daysUntil(doc.deadline) <= 7 ? "var(--red)" : "var(--text3)" }}>
                                  · scade {doc.deadline}
                                </span>}
                              </div>
                            </div>
                            <span style={{ fontSize:10, color:"var(--text3)", marginLeft:2 }}>↗</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <span style={{ fontSize:10.5, color:"var(--text3)" }}>{m.ts}</span>
                </div>
              </div>
            );
          })}

          {/* typing indicator */}
          {loading && (
            <div style={{ display:"flex", gap:12 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"var(--red)",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name="secretary" size={16} color="#FEFAEF" />
              </div>
              <div style={{ background:"var(--surface)", border:"1px solid var(--border)",
                borderRadius:"4px 14px 14px 14px", padding:"14px 18px", display:"flex", gap:5, alignItems:"center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:"var(--red)",
                    animation:`bounce 1s ${i*0.18}s infinite`,
                    opacity:0.7 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ── SUGGESTED PROMPTS (only at start) ── */}
        {messages.length === 1 && (
          <div style={{ padding:"0 20px 14px", borderTop:"1px solid var(--border)" }}>
            <div style={{ fontSize:10.5, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
              letterSpacing:"0.7px", padding:"12px 0 8px" }}>Domande suggerite</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {SUGGESTED_PROMPTS.map((p, i) => (
                <button key={i} onClick={() => send(p)}
                  style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20,
                    padding:"6px 13px", cursor:"pointer", fontSize:12, color:"var(--text2)",
                    fontFamily:"var(--font)", transition:"all 0.15s", fontWeight:500,
                    ":hover":{ background:"var(--red-soft)", borderColor:"var(--red)" } }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── INPUT BAR ── */}
        <div style={{ padding:"12px 16px", borderTop:"1px solid var(--border)",
          display:"flex", gap:10, alignItems:"flex-end",
          background:"var(--card)" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Scrivi un messaggio… (Invio per inviare, Shift+Invio per andare a capo)"
            rows={1}
            style={{ flex:1, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10,
              padding:"10px 14px", fontSize:13.5, fontFamily:"var(--font)", color:"var(--text)",
              outline:"none", resize:"none", lineHeight:1.5, maxHeight:120, overflowY:"auto",
              transition:"border-color 0.15s" }}
            onFocus={e => e.target.style.borderColor = "var(--red)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
          <button onClick={() => send()}
            disabled={!input.trim() || loading}
            style={{ background: input.trim() && !loading ? "var(--red)" : "var(--surface)",
              border:`1px solid ${input.trim() && !loading ? "var(--red)" : "var(--border)"}`,
              borderRadius:10, width:42, height:42, cursor: input.trim() && !loading ? "pointer" : "default",
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              transition:"all 0.15s" }}>
            <svg width={17} height={17} viewBox="0 0 24 24" fill="none"
              stroke={input.trim() && !loading ? "#FEFAEF" : "var(--text3)"} strokeWidth="2.2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill={input.trim() && !loading ? "#FEFAEF" : "none"}/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%,80%,100% { transform:translateY(0); }
          40% { transform:translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROFILE PAGE
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   ACCOUNT PAGE
───────────────────────────────────────────── */
const AccountPage = ({ onClose }) => {
  const [tab, setTab] = useState("profilo");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { key:"profilo",      label:"Profilo" },
    { key:"piano",        label:"Piano & Fatturazione" },
    { key:"sicurezza",    label:"Sicurezza" },
    { key:"notifiche",    label:"Notifiche" },
    { key:"integrazioni", label:"Integrazioni" },
  ];

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Field = ({ label, value, type="text", hint }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:11.5, fontWeight:700, color:"var(--text2)",
        marginBottom:5, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</label>
      <input defaultValue={value} type={type}
        style={{ width:"100%", background:"var(--surface)", border:"1px solid var(--border)",
          borderRadius:8, padding:"9px 12px", fontSize:13, color:"var(--text)",
          fontFamily:"var(--font)", outline:"none", boxSizing:"border-box",
          transition:"border-color 0.15s" }}
        onFocus={e => e.target.style.borderColor="var(--red)"}
        onBlur={e => e.target.style.borderColor="var(--border)"} />
      {hint && <div style={{ fontSize:11, color:"var(--text3)", marginTop:4 }}>{hint}</div>}
    </div>
  );

  const Toggle = ({ label, sub, defaultOn }) => {
    const [on, setOn] = useState(defaultOn);
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 0", borderBottom:"1px solid var(--border)" }}>
        <div>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--text)" }}>{label}</div>
          {sub && <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:2 }}>{sub}</div>}
        </div>
        <div onClick={() => setOn(v => !v)} style={{
          width:40, height:22, borderRadius:99, background: on ? "var(--red)" : "var(--border)",
          cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0
        }}>
          <div style={{ position:"absolute", top:3, left: on ? 20 : 3, width:16, height:16,
            borderRadius:"50%", background:"#fff", transition:"left 0.2s",
            boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }} />
        </div>
      </div>
    );
  };

  const content = {
    profilo: (
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24,
          padding:"16px", background:"var(--surface)", borderRadius:10, border:"1px solid var(--border)" }}>
          <div style={{ width:60, height:60, borderRadius:16, background:"var(--red)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:20, fontWeight:800, color:"#FEFAEF", flexShrink:0 }}>MR</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>Mario Rossi</div>
            <div style={{ fontSize:12, color:"var(--text3)" }}>mario.rossi@gmail.com</div>
          </div>
          <button style={{ background:"var(--red-soft)", border:"1px solid var(--red)",
            borderRadius:7, padding:"6px 14px", cursor:"pointer", fontSize:11.5,
            fontWeight:700, color:"var(--red)", fontFamily:"var(--font)" }}>
            Cambia foto
          </button>
        </div>
        <Field label="Nome" value="Mario" />
        <Field label="Cognome" value="Rossi" />
        <Field label="Email" value="mario.rossi@gmail.com" type="email" />
        <Field label="Telefono" value="+39 333 1234567" type="tel" />
        <Field label="Partita IVA / Codice Fiscale" value="RSSMRA80A01F205X"
          hint="Utilizzato per la fatturazione e la compliance normativa" />
        <Field label="Professione" value="Commercialista" />
      </div>
    ),

    piano: (
      <div>
        <div style={{ background:"var(--red)", borderRadius:12, padding:"18px 20px", marginBottom:20, color:"#FEFAEF" }}>
          <div style={{ fontSize:11, fontWeight:700, opacity:0.75, textTransform:"uppercase", letterSpacing:"0.6px", marginBottom:4 }}>Piano attivo</div>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:2 }}>★★ Professional</div>
            <span style={{ fontSize:11, fontWeight:700, background:"rgba(255,255,255,0.2)", borderRadius:4, padding:"1px 8px" }}>Best Value</span>
          </div>
          <div style={{ fontSize:12, opacity:0.8, marginTop:2 }}>Rinnovo il 1 aprile 2026 · €14,99/mese · oppure €149,99/anno</div>
          <div style={{ marginTop:10, display:"flex", gap:8 }}>
            <button style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.3)",
              borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:11, fontWeight:700,
              color:"#FEFAEF", fontFamily:"var(--font)" }}>Passa ad annuale →</button>
            <button style={{ background:"none", border:"1px solid rgba(255,255,255,0.25)",
              borderRadius:6, padding:"4px 12px", cursor:"pointer", fontSize:11,
              color:"rgba(255,255,255,0.7)", fontFamily:"var(--font)" }}>Disdici</button>
          </div>
        </div>
        {[
          {
            label:"Free", star:"", tag:null,
            price:"€ 0", annual:null,
            features:[
              "20 email analizzate/giorno",
              "1 casella email",
              "Archivio 30 giorni",
              "Supporto community",
            ],
            missing:["PEC","Notifiche urgenti","Ricerca AI","Dashboard"],
          },
          {
            label:"Personal", star:"★", tag:"Core",
            price:"€ 7,99/mese", annual:"€ 79,99/anno  (risparmi €16)",
            features:[
              "Email illimitate",
              "2 caselle email",
              "1 casella PEC",
              "Archivio 1 anno",
              "Notifiche urgenti SMS/push",
              "Ricerca semantica AI basica",
              "Dashboard base",
              "Supporto email",
            ],
            missing:["API access"],
          },
          {
            label:"Professional", star:"★★", tag:"Best Value",
            price:"€ 14,99/mese", annual:"€ 149,99/anno  (risparmi €30)",
            current:true,
            features:[
              "Email illimitate",
              "5 caselle email",
              "3 caselle PEC",
              "Archivio 5 anni",
              "Notifiche urgenti + priorità",
              "Ricerca semantica AI avanzata",
              "Dashboard completa",
              "Supporto email prioritario",
            ],
            missing:["API access"],
          },
          {
            label:"Business", star:"★★★", tag:"PMI",
            price:"€ 39,99/mese", annual:"€ 399,99/anno  (risparmi €80)",
            features:[
              "Email illimitate",
              "Caselle email illimitate",
              "PEC illimitate",
              "Archivio 10 anni",
              "Notifiche multi-destinatario",
              "Ricerca AI avanzata + API",
              "Dashboard + export dati",
              "REST API access",
              "Supporto Chat + SLA garantito",
            ],
            missing:[],
          },
        ].map(p => (
          <div key={p.label} style={{ border:`2px solid ${p.current ? "var(--red)" : "var(--border)"}`,
            borderRadius:10, padding:"14px 16px", marginBottom:10,
            background: p.current ? "var(--red-soft)" : "var(--surface)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                  <span style={{ fontSize:14, fontWeight:800, color: p.current ? "var(--red)" : "var(--text)" }}>
                    {p.star} Piano {p.label}
                  </span>
                  {p.tag && <span style={{ fontSize:10, background: p.current ? "var(--red)" : "var(--border)",
                    color: p.current ? "#FEFAEF" : "var(--text3)",
                    borderRadius:4, padding:"1px 7px", fontWeight:700 }}>{p.tag}</span>}
                  {p.current && <span style={{ fontSize:10, background:"var(--red)", color:"#FEFAEF",
                    borderRadius:4, padding:"1px 7px", fontWeight:700 }}>ATTIVO</span>}
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--text)", marginTop:4 }}>{p.price}</div>
                {p.annual && <div style={{ fontSize:11, color:"var(--teal)", marginTop:1 }}>📅 {p.annual}</div>}
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:8 }}>
              {p.features.map(f => (
                <span key={f} style={{ fontSize:11, color:"var(--text)", background:"var(--card)",
                  border:"1px solid var(--border)", borderRadius:4, padding:"2px 8px" }}>✓ {f}</span>
              ))}
              {p.missing && p.missing.map(f => (
                <span key={f} style={{ fontSize:11, color:"var(--text3)", background:"var(--surface)",
                  border:"1px solid var(--border)", borderRadius:4, padding:"2px 8px", opacity:0.6 }}>✗ {f}</span>
              ))}
            </div>
            {!p.current && (
              <button style={{ marginTop:10, background:"none", border:"1px solid var(--border)",
                borderRadius:7, padding:"5px 14px", cursor:"pointer", fontSize:11.5,
                fontWeight:600, color:"var(--text2)", fontFamily:"var(--font)" }}>
                Passa a questo piano →
              </button>
            )}
          </div>
        ))}
        <div style={{ marginTop:16, padding:"14px 16px", background:"var(--surface)",
          border:"1px solid var(--border)", borderRadius:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:8 }}>Storico fatture</div>
          {[["Mar 2026","€ 9,90","Pagata"],["Feb 2026","€ 9,90","Pagata"],["Gen 2026","€ 9,90","Pagata"]].map(([d,a,s]) => (
            <div key={d} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0",
              borderBottom:"1px solid var(--border)", fontSize:12 }}>
              <span style={{ color:"var(--text2)" }}>{d}</span>
              <span style={{ fontWeight:700, color:"var(--text)" }}>{a}</span>
              <span style={{ color:"var(--teal)", fontWeight:600 }}>{s}</span>
              <span style={{ color:"var(--red)", cursor:"pointer", fontWeight:600 }}>↓ PDF</span>
            </div>
          ))}
        </div>
      </div>
    ),

    sicurezza: (
      <div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:12 }}>Password</div>
          <Field label="Password attuale" value="" type="password" />
          <Field label="Nuova password" value="" type="password" hint="Minimo 8 caratteri, una maiuscola, un numero" />
          <Field label="Conferma nuova password" value="" type="password" />
        </div>
        <div style={{ marginBottom:20 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:8 }}>Autenticazione a due fattori</div>
          <Toggle label="Abilita 2FA" sub="Richiedi un codice OTP al login" defaultOn={false} />
        </div>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:8 }}>Sessioni attive</div>
          {[
            { dev:"Chrome · macOS", loc:"Milano, IT", time:"Ora", current:true },
            { dev:"Safari · iPhone", loc:"Milano, IT", time:"2 ore fa" },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 12px", background:"var(--surface)", border:"1px solid var(--border)",
              borderRadius:8, marginBottom:8 }}>
              <div>
                <div style={{ fontSize:12.5, fontWeight:600, color:"var(--text)" }}>{s.dev}</div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>{s.loc} · {s.time}</div>
              </div>
              {s.current
                ? <span style={{ fontSize:10.5, fontWeight:700, color:"var(--teal)" }}>Sessione attuale</span>
                : <button style={{ background:"none", border:"1px solid var(--border)", borderRadius:6,
                    padding:"3px 10px", cursor:"pointer", fontSize:11, color:"var(--text3)",
                    fontFamily:"var(--font)" }}>Revoca</button>}
            </div>
          ))}
        </div>
        <div style={{ marginTop:20, padding:"14px 16px", background:"rgba(176,32,40,0.06)",
          border:"1px solid rgba(176,32,40,0.2)", borderRadius:10 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--red)", marginBottom:4 }}>Zona pericolosa</div>
          <div style={{ fontSize:12, color:"var(--text3)", marginBottom:10 }}>
            L'eliminazione dell'account è irreversibile. Tutti i dati verranno cancellati.
          </div>
          <button style={{ background:"none", border:"1px solid var(--red)", borderRadius:7,
            padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:700,
            color:"var(--red)", fontFamily:"var(--font)" }}>
            Elimina account
          </button>
        </div>
      </div>
    ),

    notifiche: (
      <div>
        <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", marginBottom:4 }}>Alerting documenti</div>
        <div style={{ fontSize:11.5, color:"var(--text3)", marginBottom:14 }}>Scegli quando e come ricevere avvisi</div>
        <Toggle label="Nuova PEC ricevuta"          sub="Alert immediato per ogni PEC in arrivo" defaultOn={true} />
        <Toggle label="Documento urgente rilevato"  sub="Notifica push quando l'AI identifica urgenza" defaultOn={true} />
        <Toggle label="Scadenza entro 7 giorni"     sub="Reminder giornaliero per scadenze imminenti" defaultOn={true} />
        <Toggle label="Scadenza entro 30 giorni"    sub="Digest settimanale delle scadenze" defaultOn={false} />
        <Toggle label="Nuovo documento archiviato"  sub="Conferma ogni archiviazione automatica" defaultOn={false} />
        <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", margin:"20px 0 4px" }}>Canale di notifica</div>
        <Toggle label="Notifiche email"      sub="Invia riepilogo a mario.rossi@gmail.com" defaultOn={true} />
        <Toggle label="Notifiche push"       sub="Notifiche browser in tempo reale" defaultOn={true} />
        <Toggle label="Digest settimanale"   sub="Riepilogo domenicale dell'archivio" defaultOn={false} />
      </div>
    ),

    integrazioni: (
      <div>
        {[
          { name:"Gmail",        icon:"G", color:"#E02834", connected:true,  addr:"mario.rossi@gmail.com",  sync:"2 min fa" },
          { name:"PEC Aruba",    icon:"P", color:"var(--red)", connected:true,  addr:"m.rossi@pec.it",      sync:"5 min fa" },
          { name:"Outlook",      icon:"O", color:"#8A3040", connected:false, addr:null, sync:null },
          { name:"PEC Legalmail",icon:"L", color:"#C03040", connected:false, addr:null, sync:null },
          { name:"REM / QeRDS",  icon:"R", color:"var(--blue)", connected:false, addr:null, sync:null },
        ].map(({ name, icon, color, connected, addr, sync }) => (
          <div key={name} style={{ display:"flex", alignItems:"center", gap:12,
            padding:"12px 14px", background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:10, marginBottom:10 }}>
            <div style={{ width:36, height:36, borderRadius:9, flexShrink:0,
              background: connected ? color : "var(--surface)",
              border:`1px solid ${connected ? color : "var(--border)"}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, fontWeight:800, color: connected ? "#FEFAEF" : "var(--text3)" }}>{icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{name}</div>
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:2 }}>
                {connected ? `${addr} · Sync ${sync}` : "Non collegato"}
              </div>
            </div>
            <button style={{
              background: connected ? "none" : "var(--red-soft)",
              border:`1px solid ${connected ? "var(--border)" : "var(--red)"}`,
              borderRadius:7, padding:"5px 14px", cursor:"pointer", fontSize:11.5, fontWeight:700,
              color: connected ? "var(--text3)" : "var(--red)", fontFamily:"var(--font)" }}>
              {connected ? "Scollega" : "Collega →"}
            </button>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:600, background:"rgba(0,0,0,0.5)",
      backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center" }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width:640, maxHeight:"88vh", background:"var(--card)",
        border:"1px solid var(--border)", borderRadius:16,
        boxShadow:"0 24px 64px rgba(0,0,0,0.25)",
        display:"flex", flexDirection:"column", overflow:"hidden",
        animation:"popIn 0.2s ease"
      }}>
        <style>{`@keyframes popIn { from { transform:scale(0.96); opacity:0; } to { transform:scale(1); opacity:1; } }`}</style>

        {/* header */}
        <div style={{ padding:"20px 24px 0", borderBottom:"1px solid var(--border)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div style={{ fontSize:16, fontWeight:800, color:"var(--text)" }}>Gestisci account</div>
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", fontSize:20, lineHeight:1, fontFamily:"var(--font)" }}>✕</button>
          </div>
          <div style={{ display:"flex", gap:2 }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{ background:"none", border:"none", padding:"8px 14px", cursor:"pointer",
                  fontSize:12.5, fontWeight: tab===t.key ? 700 : 500,
                  color: tab===t.key ? "var(--red)" : "var(--text3)",
                  borderBottom: `2px solid ${tab===t.key ? "var(--red)" : "transparent"}`,
                  fontFamily:"var(--font)", transition:"all 0.15s", marginBottom:-1 }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* body */}
        <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
          {content[tab]}
        </div>

        {/* footer */}
        {["profilo","sicurezza","notifiche"].includes(tab) && (
          <div style={{ padding:"14px 24px", borderTop:"1px solid var(--border)",
            display:"flex", alignItems:"center", justifyContent:"flex-end", gap:10 }}>
            {saved && <span style={{ fontSize:12, color:"var(--teal)", fontWeight:600 }}>✓ Salvato</span>}
            <button onClick={onClose} style={{ background:"var(--surface)", border:"1px solid var(--border)",
              borderRadius:8, padding:"8px 18px", cursor:"pointer", fontSize:12.5,
              fontWeight:600, color:"var(--text2)", fontFamily:"var(--font)" }}>Annulla</button>
            <button onClick={save} style={{ background:"var(--red)", border:"none",
              borderRadius:8, padding:"8px 20px", cursor:"pointer", fontSize:12.5,
              fontWeight:700, color:"#FEFAEF", fontFamily:"var(--font)" }}>Salva modifiche</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = ({ onClose, onManageAccount }) => {
  const totalDocs   = MOCK_DOCS.length;
  const unread      = MOCK_DOCS.filter(d => !d.read).length;
  const urgent      = MOCK_DOCS.filter(d => d.urgent).length;
  const managed     = MOCK_DOCS.filter(d => d.managed).length;
  const riskDocs    = MOCK_DOCS.filter(d => d.amount);
  const totalRisk   = riskDocs.reduce((s, d) => s + parseFloat(d.amount.replace(/[^0-9,.]/g,"").replace(",",".")), 0);
  const expiring30  = MOCK_DOCS.filter(d => { const v = daysUntil(d.deadline); return v !== null && v >= 0 && v <= 30; }).length;

  const byChannel = ["EMAIL","PEC","REM"].map(ch => ({
    label: ch, value: MOCK_DOCS.filter(d => d.channel === ch).length,
    color: ch==="PEC" ? "var(--red)" : ch==="REM" ? "var(--blue)" : "var(--teal)"
  }));

  const PLAN_FEATURES = [
    { label:"Caselle collegate", value:"Illimitate", ok:true },
    { label:"Archiviazione documenti", value:"50 GB", ok:true },
    { label:"Segretario AI", value:"Incluso", ok:true },
    { label:"Conservazione a norma", value:"Prossimamente", ok:false },
    { label:"Supporto prioritario", value:"Incluso", ok:true },
    { label:"API access", value:"Non incluso", ok:false },
  ];

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:500,
      background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)",
      display:"flex", alignItems:"flex-end", justifyContent:"flex-start",
      padding:"0 0 0 0"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width:420, height:"100vh", background:"var(--card)",
        borderRight:"1px solid var(--border)",
        boxShadow:"8px 0 40px rgba(0,0,0,0.2)",
        display:"flex", flexDirection:"column", overflow:"hidden",
        animation:"slideInLeft 0.22s ease"
      }}>
        <style>{`@keyframes slideInLeft { from { transform:translateX(-30px); opacity:0; } to { transform:translateX(0); opacity:1; } }`}</style>

        {/* ── HEADER ── */}
        <div style={{ padding:"28px 24px 20px", borderBottom:"1px solid var(--border)",
          background:"var(--surface)" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ width:56, height:56, borderRadius:16, background:"var(--red)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:18, fontWeight:800, color:"#FEFAEF", letterSpacing:1, flexShrink:0 }}>MR</div>
              <div>
                <div style={{ fontSize:18, fontWeight:800, color:"var(--text)", lineHeight:1.2 }}>Mario Rossi</div>
                <div style={{ fontSize:12, color:"var(--text3)", marginTop:3 }}>mario.rossi@gmail.com</div>
                <div style={{ marginTop:7, display:"inline-flex", alignItems:"center", gap:6,
                  background:"var(--red)", borderRadius:20, padding:"3px 10px" }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:"#FEFAEF", opacity:0.8 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#FEFAEF", letterSpacing:"0.3px" }}>Piano Professional</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
              color:"var(--text3)", fontSize:20, lineHeight:1, padding:4, fontFamily:"var(--font)" }}>✕</button>
          </div>
        </div>

        {/* ── BODY (scrollable) ── */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:20 }}>

          {/* Stats grid */}
          <div>
            <div style={{ fontSize:10.5, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
              letterSpacing:"0.8px", marginBottom:10 }}>Riepilogo archivio</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { label:"Documenti totali", value:totalDocs, color:"var(--text)" },
                { label:"Non letti",         value:unread,   color:"var(--red)" },
                { label:"Urgenti",           value:urgent,   color:"var(--red)" },
                { label:"Gestiti",           value:managed,  color:"var(--teal)" },
                { label:"In scadenza 30gg",  value:expiring30, color:"var(--amber)" },
                { label:"Rischio esposto",   value:`€ ${Math.round(totalRisk).toLocaleString("it-IT")}`, color:"var(--blue)" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ background:"var(--surface)", border:"1px solid var(--border)",
                  borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontSize:10, color:"var(--text3)", fontWeight:600, marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:20, fontWeight:800, color }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Canali */}
          <div>
            <div style={{ fontSize:10.5, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
              letterSpacing:"0.8px", marginBottom:10 }}>Documenti per canale</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {byChannel.map(({ label, value, color }) => {
                const pct = Math.round((value / totalDocs) * 100);
                return (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:11, fontWeight:700, color, width:44 }}>{label}</span>
                    <div style={{ flex:1, background:"var(--border)", borderRadius:99, height:7, overflow:"hidden" }}>
                      <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:99,
                        transition:"width 0.6s ease" }} />
                    </div>
                    <span style={{ fontSize:11, color:"var(--text2)", fontWeight:600, width:24, textAlign:"right" }}>{value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Piano */}
          <div>
            <div style={{ fontSize:10.5, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
              letterSpacing:"0.8px", marginBottom:10 }}>Piano Professional — funzionalità</div>
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, overflow:"hidden" }}>
              {PLAN_FEATURES.map(({ label, value, ok }, i) => (
                <div key={label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"10px 14px",
                  borderBottom: i < PLAN_FEATURES.length-1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:13, lineHeight:1 }}>{ok ? "✓" : "·"}</span>
                    <span style={{ fontSize:12.5, color: ok ? "var(--text)" : "var(--text3)" }}>{label}</span>
                  </div>
                  <span style={{ fontSize:11.5, fontWeight:600,
                    color: ok ? "var(--red)" : "var(--text3)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Caselle collegate */}
          <div>
            <div style={{ fontSize:10.5, fontWeight:700, color:"var(--text3)", textTransform:"uppercase",
              letterSpacing:"0.8px", marginBottom:10 }}>Caselle collegate</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { label:"Gmail",      addr:"mario.rossi@gmail.com", ok:true,  icon:"G", color:"#E02834" },
                { label:"PEC Aruba",  addr:"m.rossi@pec.it",        ok:true,  icon:"P", color:"var(--red)" },
                { label:"Outlook",    addr:"Non collegato",          ok:false, icon:"O", color:"var(--text3)" },
                { label:"REM/QeRDS",  addr:"Non collegato",          ok:false, icon:"R", color:"var(--text3)" },
              ].map(({ label, addr, ok, icon, color }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:10,
                  background:"var(--surface)", border:"1px solid var(--border)", borderRadius:9, padding:"9px 12px" }}>
                  <div style={{ width:28, height:28, borderRadius:7, background:ok ? color : "var(--surface)",
                    border:`1px solid ${ok ? color : "var(--border)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:800, color:ok ? "#FEFAEF" : "var(--text3)", flexShrink:0 }}>{icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{label}</div>
                    <div style={{ fontSize:11, color:"var(--text3)", marginTop:1 }}>{addr}</div>
                  </div>
                  <div style={{ width:8, height:8, borderRadius:"50%",
                    background: ok ? "var(--teal)" : "var(--border)" }} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── FOOTER ── */}
        <div style={{ padding:"14px 24px", borderTop:"1px solid var(--border)", display:"flex", gap:8 }}>
          <button onClick={onManageAccount} style={{ flex:1, background:"var(--red-soft)", border:"1px solid var(--red)",
            borderRadius:8, padding:"9px", cursor:"pointer", fontSize:12.5, fontWeight:700,
            color:"var(--red)", fontFamily:"var(--font)" }}>
            Gestisci account
          </button>
          <button onClick={onClose} style={{ background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:8, padding:"9px 16px", cursor:"pointer", fontSize:12.5, fontWeight:600,
            color:"var(--text2)", fontFamily:"var(--font)" }}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [page, setPage]           = useState("dashboard");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Ciao Mario! Sono il tuo **Segretario AI**. Posso aiutarti a trovare documenti, controllare scadenze, capire il tuo stato finanziario o rispondere a qualsiasi domanda sul tuo archivio. Come posso esserti utile oggi?",
      ts: new Date().toLocaleTimeString("it-IT", { hour:"2-digit", minute:"2-digit" }),
    }
  ]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [allDocs, setAllDocs]     = useState(MOCK_DOCS);

  const handleGlobalSearchSelect = (doc) => {
    setSelectedDoc(doc);
    setPage("archive");
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "dashboard" },
    { key: "inbox", label: "Inbox", icon: "inbox", badge: MOCK_DOCS.filter(d => !d.read).length },
    { key: "archive", label: "Archivio", icon: "archive" },
    { key: "alerts", label: "Scadenze", icon: "alert", badge: MOCK_DOCS.filter(d => d.urgent).length },
    { key: "connections", label: "Connessioni", icon: "link" },
  ];

  const pageTitles = { dashboard: "Panoramica", inbox: "Inbox", archive: "Archivio", alerts: "Scadenze", connections: "Connessioni", calendar: "Calendario Scadenze", secretary: "Segretario AI" };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className={`sidebar${!sidebarOpen ? " collapsed" : ""}`}>
          <div className="sidebar-header">
            <img onClick={!sidebarOpen ? () => setSidebarOpen(true) : undefined} className={`logo-icon${!sidebarOpen ? " clickable" : ""}`} title={!sidebarOpen ? "Espandi sidebar" : undefined} src="data:image/png;base64,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" alt="A-ESP" />
            <span className="logo-wordmark">A-ESP</span>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(v => !v)} title="Riduci sidebar">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          </div>
          <div className="sidebar-nav">
            <div className="nav-section">Navigazione</div>
            {navItems.map(item => (
              <div key={item.key} className={`nav-item ${page === item.key ? "active" : ""} ${item.badge > 0 ? "has-badge" : ""}`} onClick={() => setPage(item.key)}>
                <span className="nav-icon"><Icon name={item.icon} size={15} color={page === item.key ? "var(--red)" : "currentColor"} /></span>
                <span className="nav-item-label">{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}

            <div className="nav-section" style={{ marginTop: 12 }}>AI & Configurazione</div>
            <div className={`nav-item ${page === "secretary" ? "active" : ""}`} onClick={() => setPage("secretary")}>
              <span className="nav-icon"><Icon name="secretary" size={15} color={page === "secretary" ? "var(--red)" : "currentColor"} /></span>
              <span className="nav-item-label">Segretario AI</span>
              <span style={{ marginLeft:"auto", fontSize:9, fontWeight:800, background:"var(--red)", color:"#FEFAEF",
                borderRadius:4, padding:"1px 5px", letterSpacing:"0.4px" }} className="nav-badge">AI</span>
            </div>
            <div className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => setPage("settings")}>
              <span className="nav-icon"><Icon name="settings" size={15} color={page === "settings" ? "var(--red)" : "currentColor"} /></span>
              <span className="nav-item-label">Impostazioni</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="user-pill" onClick={() => setShowProfile(true)}
              style={{ cursor:"pointer", transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="var(--surface)"}
              onMouseLeave={e => e.currentTarget.style.background=""}>
              <div className="user-avatar">MR</div>
              <div>
                <div className="user-name">Mario Rossi</div>
                <div className="user-plan">Piano Professional</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="page-title">{pageTitles[page] || "A-ESP"}</div>
            <div className="ai-chip" style={{ marginRight: 8 }}>
              <span className="ai-dot" />AI Engine attivo
            </div>
            <GlobalSearch allDocs={allDocs} onSelect={handleGlobalSearchSelect} />
            <div
              className="icon-btn"
              onClick={() => setShowNotif(v => !v)}
              style={showNotif ? {background:"var(--red)",color:"#FEFAEF",borderColor:"var(--red)"} : {}}
            >
              <Icon name="bell" size={15} color={showNotif ? "#FEFAEF" : "currentColor"} />
              {!showNotif && <div className="notif-dot" />}
            </div>
            <div className={`icon-btn${page==="calendar"?" ":""}`} onClick={() => setPage(p => p === "calendar" ? "dashboard" : "calendar")} style={page==="calendar"?{background:"var(--red)",color:"#FEFAEF",borderColor:"var(--red)"}:{}}><Icon name="calendar" size={15} /></div>
          </div>

          <div className="content">
            {page === "dashboard" && <Dashboard onDocClick={setSelectedDoc} onNavigate={setPage} />}
            {page === "inbox" && <Inbox onDocClick={setSelectedDoc} />}
            {page === "archive" && <Archive onDocClick={setSelectedDoc} allDocs={allDocs} setAllDocs={setAllDocs} />}
            {page === "alerts" && <Alerts onDocClick={setSelectedDoc} />}
            {page === "connections" && <Connections />}
            {page === "calendar" && <CalendarPage onDocClick={setSelectedDoc} />}
            {page === "secretary" && <SecretaryPage onDocClick={setSelectedDoc} messages={chatMessages} setMessages={setChatMessages} />}
            {page === "settings" && (
              <div className="fade-in">
                <div className="section-title" style={{ marginBottom: 16 }}>Impostazioni</div>
                <div className="info-box">
                  <div className="info-box-title">Preferenze AI</div>
                  <div className="info-box-text">Configura soglie di allerta, frequenza di analisi e regole di classificazione personalizzate. <span style={{ color: "var(--red)", cursor: "pointer" }}>Prossimamente →</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} onDocClick={doc => { setSelectedDoc(doc); setShowNotif(false); }} />}
        {selectedDoc && <DocDrawer doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
        {showProfile && <ProfilePage onClose={() => setShowProfile(false)} onManageAccount={() => { setShowProfile(false); setShowAccount(true); }} />}
        {showAccount && <AccountPage onClose={() => setShowAccount(false)} />}
      </div>
    </>
  );
}
