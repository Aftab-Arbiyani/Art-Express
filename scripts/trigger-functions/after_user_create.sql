-- FUNCTION: public.after_user_create()

-- DROP FUNCTION IF EXISTS public.after_user_create();

CREATE OR REPLACE FUNCTION public.after_user_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  INSERT INTO cart (
    id,
    fk_user,
    created_at,
    updated_at
  )
  VALUES (
      uuid_generate_v4(),
      NEW.id,
      NOW(),
      NOW()
  );
  RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.after_user_create()
    OWNER TO postgres;
