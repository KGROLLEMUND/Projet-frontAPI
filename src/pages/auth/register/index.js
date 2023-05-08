import Link from "next/link";
import Title from '@/components/UI/Title';
import Button_link from '@/components/UI/Button-link';
import Button from '@/components/UI/Button';


const Index = () => {


  return (
    <>
      <Title title="Inscription" Level="h1" />
        <div className="form_group">
          <div>
            <Button_link title="Freelance" className={"btn__register__userType"} link="/auth/register/freelance"  />
          </div>
          <div>
            <Button_link title="Entreprise" className={"btn__register__userType"} link="/auth/register/company"  />
          </div>
        </div>
       
      <p>
        Vous avez déjà un compte ? <Button title="Se connecter" className={"btn"} link="/auth/login"  />
      </p>
    </>
  );
}

export default Index;