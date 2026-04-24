ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT leads_email_length CHECK (char_length(email) BETWEEN 5 AND 255),
  ADD CONSTRAINT leads_phone_length CHECK (char_length(phone) BETWEEN 7 AND 25),
  ADD CONSTRAINT leads_inquiry_length CHECK (char_length(inquiry) BETWEEN 1 AND 2000);
