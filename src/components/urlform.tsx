type UrlFormProps = {
    urlUpdater: (url: string) => void;
}

function URLForm({ urlUpdater }: UrlFormProps) {
    function isValidURL (url: string) {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const url = formData.get('url') as string;
      if (!isValidURL(url)) {
        alert('URL inválida!')
        return
      }
  
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+"/url", {
          method: "POST",
          body: formData,
        })
        
        if (!response.ok)
          throw new Error('Response status: ${response.status}')
  
        response.json().then((responseText) => {
            urlUpdater(responseText.id)
            navigator.clipboard.writeText(responseText.id)
        })
      } catch (error) {
        alert((error as Error).message)
      }
    };
  
    return (
      <form className='inputForm' onSubmit={handleSubmit}>
        <label className='inputLabel'>
          Endereço URL:
          <input type="text" name="url" placeholder="https://exemplo.com" required className="basicInput"/>
          </label>
          <label className='inputLabel'>
            Exibir página de confirmação antes de redirecionar
            <input type='checkbox' id='confirmCheckbox' name='requiresConfirmation' />
          </label>
        <input type="submit" value="ENCURTAR" className='prettyButtom'/>
      </form>
    )
  }

  export default URLForm