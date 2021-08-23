
function Test({test, click}){
  
  return (
    <div>
      <button type="button" onClick={test}>{click ? "true":"false"}</button>
    </div>
  )
}

export default Test;