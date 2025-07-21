export default function SearchNote(props) {
  function handleChange(e) {
    props.setSearch(e.target.value);
  }

  return <input type="text" placeholder="Qidirish..." value={props.search} onChange={handleChange} />;
}
