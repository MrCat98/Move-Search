
export default  function formatDate(dateString: string) {
   

  return new Date(dateString).toLocaleDateString('en-Un', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
  });
}