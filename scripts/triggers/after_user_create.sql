-- Trigger: after_user_create

-- DROP TRIGGER IF EXISTS after_user_create ON public."user";

CREATE OR REPLACE TRIGGER after_user_create
    AFTER INSERT
    ON public."user"
    FOR EACH ROW
    EXECUTE FUNCTION public.after_user_create();