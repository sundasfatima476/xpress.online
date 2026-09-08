import { FiCheck, FiX } from "react-icons/fi";
import { TIMELINE_STEPS } from "../data/orders";

export default function OrderTimeline({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="border border-red-900/15 bg-red-50/40 p-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-charcoal/10 flex items-center justify-center shrink-0">
          <FiX className="text-charcoal/60" size={18} />
        </div>
        <div>
          <p className="font-serif text-lg text-charcoal">This order was cancelled</p>
          <p className="text-sm text-charcoal/60 mt-0.5">
            If you believe this is a mistake, please contact our support team.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = TIMELINE_STEPS.indexOf(status);

  return (
    <div>
      {/* Desktop horizontal timeline */}
      <div className="hidden md:flex items-start">
        {TIMELINE_STEPS.map((step, idx) => {
          const done = idx < currentIndex;
          const current = idx === currentIndex;
          const isLast = idx === TIMELINE_STEPS.length - 1;
          return (
            <div key={step} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
              <div className="flex flex-col items-center text-center w-24">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                    done
                      ? "bg-forest border-forest text-ivory"
                      : current
                      ? "bg-gold border-gold text-forest-dark ring-4 ring-gold/20"
                      : "bg-softwhite border-charcoal/20 text-charcoal/30"
                  }`}
                >
                  {done ? (
                    <FiCheck size={15} />
                  ) : current ? (
                    <span className="w-2 h-2 rounded-full bg-forest-dark" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                  )}
                </div>
                <p
                  className={`mt-2.5 text-xs leading-tight ${
                    done || current ? "text-charcoal font-medium" : "text-charcoal/40"
                  }`}
                >
                  {step}
                </p>
              </div>
              {!isLast && (
                <div className={`flex-1 h-[2px] mt-4 ${idx < currentIndex ? "bg-forest" : "bg-charcoal/15"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden space-y-0">
        {TIMELINE_STEPS.map((step, idx) => {
          const done = idx < currentIndex;
          const current = idx === currentIndex;
          const isLast = idx === TIMELINE_STEPS.length - 1;
          return (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    done
                      ? "bg-forest border-forest text-ivory"
                      : current
                      ? "bg-gold border-gold text-forest-dark ring-4 ring-gold/20"
                      : "bg-softwhite border-charcoal/20 text-charcoal/30"
                  }`}
                >
                  {done ? (
                    <FiCheck size={13} />
                  ) : current ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-dark" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                  )}
                </div>
                {!isLast && (
                  <div className={`w-[2px] flex-1 min-h-[28px] ${idx < currentIndex ? "bg-forest" : "bg-charcoal/15"}`} />
                )}
              </div>
              <p className={`pb-6 text-sm ${done || current ? "text-charcoal font-medium" : "text-charcoal/40"}`}>
                {step}
                {current && <span className="block text-xs text-gold-dark font-normal mt-0.5">Current status</span>}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
