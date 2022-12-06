export default EditFavourite = (isFavourite) => {
    const docRef = doc(db, "users-favourite", id);
    updateDoc(docRef, { favourite }).then((res) => {
        console.log(res);
    });
};
