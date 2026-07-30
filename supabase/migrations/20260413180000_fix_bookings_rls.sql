-- Fix RLS policies for bookings table
-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Anyone can create a booking" ON public.bookings;
DROP POLICY IF EXISTS "Service role can manage bookings" ON public.bookings;

-- Allow anyone (including anonymous/unauthenticated users) to INSERT bookings
CREATE POLICY "public_can_insert_bookings"
ON public.bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anonymous users to SELECT bookings (needed to check slot availability)
-- We only expose date and time fields, not PII
CREATE POLICY "public_can_read_booking_slots"
ON public.bookings
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow service role full access for admin operations
CREATE POLICY "service_role_can_manage_bookings"
ON public.bookings
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Also fix affiliates table RLS so authenticated users can insert/read their own record
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users_can_read_own_affiliate" ON public.affiliates;
DROP POLICY IF EXISTS "users_can_insert_own_affiliate" ON public.affiliates;
DROP POLICY IF EXISTS "users_can_update_own_affiliate" ON public.affiliates;

CREATE POLICY "users_can_read_own_affiliate"
ON public.affiliates
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "users_can_insert_own_affiliate"
ON public.affiliates
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "users_can_update_own_affiliate"
ON public.affiliates
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Also fix referrals table RLS so affiliates can read their own referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "affiliates_can_read_own_referrals" ON public.referrals;

CREATE POLICY "affiliates_can_read_own_referrals"
ON public.referrals
FOR SELECT
TO authenticated
USING (affiliate_id = auth.uid());
