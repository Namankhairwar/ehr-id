CREATE POLICY "Allow public insert on Pateint" ON public."Pateint" FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on Pateint" ON public."Pateint" FOR SELECT USING (true);