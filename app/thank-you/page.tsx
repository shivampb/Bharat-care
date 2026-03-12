"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Mail } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl w-full bg-white rounded-3xl p-10 text-center shadow-2xl shadow-primary/5 border border-border"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>
          <div className="absolute inset-0 border-4 border-green-50 rounded-full animate-ping" style={{ animationDuration: "3s" }}></div>
        </div>

        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Request Submitted!</h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Thank you for choosing Bharat Care. Your consultation request has been successfully received by our dedicated medical concierge team.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 shrink-0 font-bold text-sm">1</div>
              <p className="text-sm text-foreground mt-1">A medical coordinator will review your profile and selected preferences.</p>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 shrink-0 font-bold text-sm">2</div>
              <p className="text-sm text-foreground mt-1">We will contact you via email or phone within 24 hours.</p>
            </li>
            <li className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 shrink-0 font-bold text-sm">3</div>
              <p className="text-sm text-foreground mt-1">Your detailed itinerary and exact cost breakdown will be finalized.</p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Link>
          <a
            href="mailto:support@bharatcare.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-slate-100 text-foreground hover:bg-slate-200 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </a>
        </div>
      </motion.div>
    </div>
  );
}
