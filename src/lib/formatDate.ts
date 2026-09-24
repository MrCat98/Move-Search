
export default  function formatDate(dateString: string) {
   

  return new Date(dateString).toLocaleDateString('en-Us', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric',
  });
}