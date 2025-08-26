import PropTypes from 'prop-types';

const ingredientObject = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
}

const ingredientDataProp = PropTypes.shape(ingredientObject);

const ingredientDataIndexedProp = PropTypes.shape({
  ...ingredientObject,
  itemId: PropTypes.string.isRequired,
  itemOrder: PropTypes.number.isRequired
})

const scrollPosProp = PropTypes.shape({
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired
})


export { ingredientDataProp, ingredientDataIndexedProp, scrollPosProp }