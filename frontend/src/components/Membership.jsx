function Membership({ tiers, profile }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white to-latte/80 border border-white/60 rounded-3xl p-8 shadow-soft">
        <h3 className="font-heading text-2xl text-charcoal">Tier Membership</h3>
        <p className="text-slate-600 mt-2">
          Nikmati benefit eksklusif mulai dari prioritas booking hingga curated tasting sessions.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.id} className="rounded-3xl border border-slate-200/60 bg-white/80 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-teal/70">{tier.id}</p>
              <h4 className="font-heading text-xl text-charcoal mt-2">{tier.name}</h4>
              <p className="text-teal font-semibold mt-4">Rp {tier.pricePerYear.toLocaleString('id-ID')} / tahun</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2 items-start">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gold"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {profile && (
        <div className="rounded-3xl border border-teal/40 bg-teal/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-teal/70">Membership aktif</p>
          <h4 className="font-heading text-xl text-charcoal mt-2">{profile.fullName}</h4>
          <p className="text-slate-600 mt-1">Tier: {profile.membershipTier}</p>
        </div>
      )}
    </div>
  );
}

export default Membership;
