<template>
	<router-view />

</template>

<script setup>

</script>

<style lang="scss">

/*Ant Design card */
.card {
	width: calc(100% - 20px);
}

/* Buttons */
@mixin status-button-style($color, $hover-color) {
	text-transform: capitalize; 
	background: $color;
	transition: all .2s;
	color: #fff;
	padding: .5rem 1.2rem;
	font-size: 1.5rem;
	border-radius: 5px;

	&:hover {
		background: $hover-color !important;
	}
}

.active-button {
	@include status-button-style(#28a745, #32c754);
}

.inactive-button {
	@include status-button-style(#f42024, #ff4d4f);
}

.add-button {
	text-decoration: none;
	color: #28a745;
	transition: all .2s;
	padding: .5rem 1.2rem;
	font-size: 1.5rem;
	border-radius: 5px;
	border: 1px solid #28a745;

	i {
		font-size: 1rem;
		margin-right: .5rem;
	}

	&:hover {
		color: #32c754;
		border: 1px solid #32c754;
		transform: scale(1.1);

	}
}

@mixin button-style($color, $hover-color) {
	border-color: $color !important;
	transition: all .2s;
	width: 3rem;
	height: 3rem;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		color: $color !important;
	}

	&:hover {
		border-color: $hover-color !important;
		transform: scale(1.2);

		span {
			color: $hover-color;
		}
	}
}

.detail-btn {
	@include button-style(#595050, #8d8383);
}

.edit-btn {
	@include button-style(#ffb702, #ffc942);
}

.delete-btn {
	@include button-style(#f42024, #ff4d4f);
}
/* End Buttons */

/* Margin */
.mt-20 {
	margin-top: 20px;
}

.mb-20 {
	margin-bottom: 20px;
}

.ml-20 {
	margin-left: 20px;
}

.mr-20 {
	margin-right: 20px;
}

/* custom select tag */
.custom-select {
  padding: .8rem;
  font-size: 1.5rem;
}

/* custom input */
.input-custom::placeholder {
  color: #a7a7a7;
}

/* custom table and card */

.custom-card {
  position: relative;

  &__header {
    padding: 15px;
    h2 {
      margin: 0;
      padding: 0;
    }
  }

  &__body {
    width: 100%;
    
    .custom-table {
      width: 100%;
      &__head {
        vertical-align: middle;
        height: 4rem;
        border-bottom: 1px solid #ddd;
      }

      th {
        font-size: 1.6rem;
        text-align: center !important;
      }

      tr {
        font-size: 1.6rem;
        td {
          vertical-align: middle;
          text-align: center;
					padding: 1.2rem 0; 
        }
      }

      .custom-image {
        width: 12rem;
        height: 12rem;
        object-fit: cover;
        vertical-align: middle;
      }

      .input-position {
        width: 4rem; 
        border: 1px solid #ddd; 
        text-align: center;
      }

      td {
        .actions-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.6rem;
            margin-right: 1rem;
          }
        }
      }
    }
  }
  .pagination-element {
    padding-top: 2.5rem;
  }
}

.table-row-custom {
  background: #666363;
  height: 4rem;
  color: #fff;
  font-family: var(--font-2);
  &:hover {
    background: #666363 !important;
  }
}

// tiny-mce
.tox-menubar {
  width: 38rem !important ;
  display: flex ;
  justify-content: space-around ;
}

// custom-input
.input-custom {
  font-size: 1.6rem;
  height: 4rem;
}
</style>