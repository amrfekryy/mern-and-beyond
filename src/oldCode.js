
// static Formik Fields:
/*
<Field type='text' name='title' placeholder='Title' /><br /><br />
<Field>
  {() => (
    <>
    <input type='text' name='title' placeholder='Title' /><br /><br />
    </>
  )}
</Field>

<Field component='textarea' name='description' placeholder='Description' /><br /><br />

<label htmlFor="id">Select User </label>
<Field component='select' name='userID'>
  { // create options based on user object
    map(this.props.users.data, (value, key) => {
      return <option key={key} value={key}>{value.name}</option>
    })
  }
</Field><br /><br />

<Field type='checkbox' name='active' /> Active/Inactive<br /><br /> 
*/

// ------------------------------------

// render pretty JSON in HTML:
/*
<pre>{JSON.stringify(fieldsJSON, null, 2)}</pre> 
*/

// ------------------------------------
